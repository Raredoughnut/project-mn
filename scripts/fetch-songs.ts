/* eslint-disable no-await-in-loop */
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import log4js from "log4js";
import * as cheerio from "cheerio";
import {
  chunkBy,
  concatOrCoalesceString,
  ensureNoDuplicateEntry,
  hashed,
} from "./utils";

const logger = log4js.getLogger("popn/fetch-songs-v3");
logger.level = log4js.levels.INFO;

const VERSION_ID = "popn29";

const DATA_URL = "https://p.eagate.573.jp";
const IMAGE_BASE_URL = "https://p.eagate.573.jp/";

/** ms 밀리초 동안 대기(순수 TS · 외부 의존 없음). */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const categoryMap = new Map([
  [1, "オススメ"],
  [2, "東方アレンジ"],
  [3, "ひなビタ♪"],
  [4, "バンめし♪"],
  [5, "TV・アニメ"],
  [6, "J-POP"],
  [7, "NET MUSIC・VOCALOID"],
  [8, "クラシック"],
  [9, "GAME MUSIC"],
  //! add further category here !//
]);

const bemaniCategoryMap = new Map([
  [1, "beatmania IIDX"],
  [2, "DanceDanceRevolution"],
  [3, "GITADORA"],
  [4, "jubeat"],
  [5, "REFLEC BEAT"],
  [6, "SOUND VOLTEX"],
  [7, "BeatStream"],
  [8, "MUSECA"],
  [9, "ノスタルジア"],
  [10, "BEMANI"],
]);

const versionMap = new Map([
  [0, "pop'n 家庭用"],
  [1, "pop'n music"],
  [2, "pop'n music 2"],
  [3, "pop'n music 3"],
  [4, "pop'n music 4"],
  [5, "pop'n music 5"],
  [6, "pop'n music 6"],
  [7, "pop'n music 7"],
  [8, "pop'n music 8"],
  [9, "pop'n music 9"],
  [10, "pop'n music 10"],
  [11, "pop'n music 11"],
  [12, "pop'n music 12 いろは"],
  [13, "pop'n music 13 カーニバル"],
  [14, "pop'n music 14 FEVER！"],
  [15, "pop'n music 15 ADVENTURE"],
  [16, "pop'n music 16 PARTY♪"],
  [17, "pop'n music 17 THE MOVIE"],
  [18, "pop'n music 18 せんごく列伝"],
  [19, "pop'n music 19 TUNE STREET"],
  [20, "pop'n music 20 fantasia"],
  [21, "pop'n music Sunny Park"],
  [22, "pop'n music ラピストリア"],
  [23, "pop'n music éclale"],
  [24, "pop'n music うさぎと猫と少年の夢"],
  [25, "pop'n music peace"],
  [26, "pop'n music 解明リドルズ"],
  [27, "pop'n music UniLab"],
  [28, "pop'n music Jam&Fizz"],
  [29, "pop'n music High☆Cheers!!"],
  //! add further version here !//
]);

const manualUpperMappingWithVersion = new Map([
  ["Aithon", [null, "pop'n peace"]],
  ["Blue River", [null, "pop'n peace"]],
  ["Butter-FLY", ["pop'n 17 THE MOVIE", "pop'n 解明リドルズ"]],
  ["FLOWER", ["pop'n 20 fantasia", "pop'n peace"]],
  ["GET WILD", ["pop'n 13 カーニバル", "pop'n 解明リドルズ"]],
  ["Little prayer", [null, "pop'n 解明リドルズ"]],
  ["MADSPEED狂信道", ["pop'n éclale", "pop'n peace"]],
  ["Russian Caravan Rhapsody", ["pop'n ラピストリア", "pop'n 解明リドルズ"]],
  ["ZETA～素数の世界と超越者～", ["pop'n 15 ADVENTURE", "pop'n 解明リドルズ"]],
  ["murmur twins(guitar pop ver.)", ["pop'n 10", "pop'n peace"]],
  ["nostos", ["pop'n うさぎと猫と少年の夢", "pop'n peace"]],
  ["only my railgun", ["pop'n 19 TUNE STREET", "pop'n UniLab"]],
  ["perditus†paradisus", ["pop'n ラピストリア", "pop'n peace"]],
  ["いーあるふぁんくらぶ", ["pop'n ラピストリア", "pop'n Jam&Fizz"]],
  ["エイプリルフールの唄", ["pop'n 12 いろは", "pop'n peace"]],
  ["クラゲータ", ["pop'n 11", "pop'n peace"]],
  ["シャムシールの舞", ["pop'n 14 FEVER!", "pop'n peace"]],
  ["シュガーソングとビターステップ", ["pop'n éclale", "pop'n 解明リドルズ"]],
  ["セツナトリップ", ["pop'n Sunny Park", "pop'n 解明リドルズ"]],
  ["ナスカの丘", ["pop'n 19 TUNE STREET", "pop'n 解明リドルズ"]],
  ["ポルターガイスト", ["pop'n 16 PARTY♪", "pop'n 解明リドルズ"]],
  ["一触即発☆禅ガール", ["pop'n peace", "pop'n Jam&Fizz"]],
  ["創聖のアクエリオン", ["pop'n 16 PARTY♪", "pop'n 解明リドルズ"]],
  ["千本桜", ["pop'n peace", "pop'n Jam&Fizz"]],
  ["夏祭り", ["pop'n 17 THE MOVIE", "pop'n 解明リドルズ"]],
  ["夢幻ノ光", ["pop'n 12 いろは", "pop'n peace"]],
  ["子供の落書き帳", [null, "pop'n peace"]],
  ["少年リップルズ", ["pop'n 19 TUNE STREET", "pop'n 解明リドルズ"]],
  ["序", ["pop'n 18 せんごく列伝", "pop'n peace"]],
  ["曇天", ["pop'n 18 せんごく列伝", "pop'n Jam&Fizz"]],
  ["桃花恋情", ["pop'n 15 ADVENTURE", "pop'n 解明リドルズ"]],
  ["残酷な天使のテーゼ", ["pop'n 12 いろは", "pop'n UniLab"]],
  ["生命の焔纏いて", ["pop'n Sunny Park", "pop'n 解明リドルズ"]],
  ["真超深ＴＩＯＮ", ["pop'n 13 カーニバル", "pop'n peace"]],
  ["路男", ["pop'n 15 ADVENTURE", "pop'n 解明リドルズ"]],
  ["雫", ["pop'n 12 いろは", "pop'n peace"]],
  ["鳳凰～Chinese Phoenix Mix～", ["pop'n 20 fantasia", "pop'n 解明リドルズ"]],
]);

const manualAltMappingWithGenre = new Map([
  ["つぼみ", ["ピンキッシュ", "胸キュン☆ブロッサム"]],
  ["Denpasar", ["バリトランス", "ウラ・バリトランス"]],
  ["H@ppy Choice", ["メロコア", "メロコアＬＩＶＥ"]],
  ["Homesick Pt.2&3", ["ソフトロック", "ソフトロックＬＯＮＧ"]],
  ["I REALLY WANT TO HURT YOU", ["ポップス", "ポップスアンコール"]],
  ["cat's scat", ["スキャット", "ウラ・スキャット"]],
  ["une fille dans la pluie", ["フレンチポップ", "フレンチポップＪ"]],
  ["今宵Lover's Day", ["パッション", "パッションＬＩＶＥ"]],
  ["光の季節", ["メロウ", "メロウREMIX"]],
  ["男々道", ["ヒップロック２", "ウラ・ヒップロック2"]],
  ["西新宿清掃曲", ["パーカッシヴ", "ウラ・パーカッシヴ"]],
  ["赤いリンゴ", ["グルーブロック", "グルーブロックＬＩＶＥ"]],
]);

const manualAltMappingWithArtist = new Map([
  ["朱と碧のランページ", ["NU-KO", "covered by 儒烏風亭らでん(ReGLOSS)"]],
  [
    "リメンバーリメンバー",
    ["rino & m@sumi from plastic penguin", "covered by 轟はじめ(ReGLOSS)"],
  ],
  ["Keep the Faith", ["ときめきアイドル project Rhythmixxx", "吾龍"]],
  ["僕の飛行機", ["宮永やよい", "covered by 不知火フレア"]],
]);

function getSheetType(rawSong: Record<string, any>) {
  const { title } = rawSong;

  return title.endsWith("(UPPER)") ? "upper" : "std";
}

function getSongId(rawSong: Record<string, any>) {
  const { title, genre, artist } = rawSong;

  if (title === "Homesick Pt.2&3") {
    if (genre === "ソフトロック" && artist === "ORANGENOISE SHORTCUT")
      return "Homesick Pt.2&3";
    if (genre === "ソフトロックＬＯＮＧ" && artist === "ORANGENOISE SHORTCUT")
      return "Homesick Pt.2&3 (2)";
    if (
      genre === "ソフトロックＬＯＮＧ" &&
      artist === "covered by 不知火フレア"
    )
      return "Homesick Pt.2&3 (3)";

    throw new Error(`Cannot resolve song: ${title}`);
  }

  if (manualAltMappingWithGenre.has(title)) {
    const genres = manualAltMappingWithGenre.get(title)!;
    const genrePos = genres.indexOf(genre);

    if (genrePos === 0) return title;
    if (genrePos >= 1) return `${title} (${1 + genrePos})`;

    throw new Error(
      `Cannot use manual mapping with genre: ${JSON.stringify(rawSong)}`,
    );
  }

  if (manualAltMappingWithArtist.has(title)) {
    const artists = manualAltMappingWithArtist.get(title)!;
    const artistPos = artists.indexOf(artist);

    if (artistPos === 0) return title;
    if (artistPos >= 1) return `${title} (${1 + artistPos})`;

    throw new Error(
      `Cannot use manual mapping with artist: ${JSON.stringify(rawSong)}`,
    );
  }

  return title;
}

export function mergeSongs(songs: Record<string, any>[]) {
  const mergedSongs = new Map<string, Record<string, any>>();

  for (const song of songs) {
    if (mergedSongs.has(song.id)) {
      const mergedSong = mergedSongs.get(song.id)!;

      mergedSong.category = concatOrCoalesceString(
        mergedSong.category,
        song.category,
      );
      mergedSong.version ??= song.version;
    } else {
      mergedSongs.set(song.id, song);
    }
  }

  const mergedSongsList = [...mergedSongs.values()].toSorted(
    (a, b) => Number(a.version != null) - Number(b.version != null),
  );

  for (const song of mergedSongsList) {
    song.sheetType = getSheetType(song);
    song.songId = getSongId(song);
  }

  return mergedSongsList;
}

async function* fetchSongs({
  versionId = /* ALL */ -1,
  categoryId = /* ALL */ 0,
  bemaniId = /* ALL */ 0,
}: {
  versionId?: number;
  categoryId?: number;
  bemaniId?: number;
}) {
  async function* startFetchPage(
    pageNo = 0,
  ): AsyncGenerator<Record<string, any>[]> {
    logger.info(`- page ${pageNo}`);

    const url = new URL(`${DATA_URL}/game/popn/${VERSION_ID}/music/list.html`);
    url.searchParams.set("version", String(versionId));
    url.searchParams.set("category", String(categoryId));
    url.searchParams.set("bemani", String(bemaniId));
    url.searchParams.set("page", String(pageNo));

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch page ${pageNo}: ${response.status} ${response.statusText}`,
      );
    }
    const html = await response.text();

    const $ = cheerio.load(html);

    const songs = chunkBy(
      $(".mu_list_table:not(.mu_head) > li").toArray(),
      3,
    ).map(([imageLi, infoLi, levelsLi]) => {
      const imageUrl = new URL(
        $(imageLi).find("img").attr("src")!,
        IMAGE_BASE_URL,
      ).toString();
      const imageName = `${hashed(imageUrl)}.png`;

      const id = new URL(imageUrl).searchParams.get("img");
      const genre = $(infoLi).find("p:nth-of-type(1)").text().trim();
      const title = $(infoLi).find("p:nth-of-type(2)").text().trim();
      const artist = $(infoLi).find("p:nth-of-type(3)").text().trim();

      const levels = $(levelsLi)
        .find("p")
        .toArray()
        .map((e) => $(e).data("d"))
        .map((e) => (e !== "-" ? e : null));

      const rawSong = {
        id,
        genre,

        category:
          categoryMap.get(categoryId) ??
          bemaniCategoryMap.get(bemaniId) ??
          null,
        title,
        artist,

        imageName,
        imageUrl,

        lev_light: levels[0],
        lev_normal: levels[1],
        lev_hyper: levels[2],
        lev_ex: levels[3],

        version: versionMap.get(versionId) ?? null,
        releaseDate: null,

        isNew: null,
        isLocked: null,

        comment: null,
      };

      return {
        // songId will be assigned during merge
        ...rawSong,
      };
    });

    yield songs;

    if ($("a:contains(次へ>>)").length > 0) {
      await sleep(300);
      yield* startFetchPage(pageNo + 1);
    }
  }

  yield* startFetchPage();
}

function extractSheets(rawSong: Record<string, any>) {
  return [
    { difficulty: "light", level: rawSong.lev_light },
    { difficulty: "normal", level: rawSong.lev_normal },
    { difficulty: "hyper", level: rawSong.lev_hyper },
    { difficulty: "ex", level: rawSong.lev_ex },
  ]
    .filter((e) => e.level != null)
    .map((rawSheet) => ({
      songId: rawSong.songId,
      type: rawSong.sheetType,
      ...rawSheet,
    }));
}

export default async function run() {
  logger.info(`Fetching songs from: ${DATA_URL} ...`);
  const rawSongs: Record<string, any>[] = [];
  for (const [versionId, version] of versionMap.entries()) {
    logger.info(`* version '${version}' (${versionId})`);

    for await (const pageOfSongs of fetchSongs({ versionId })) {
      rawSongs.push(...pageOfSongs);
    }
  }
  for (const [categoryId, category] of categoryMap.entries()) {
    logger.info(`* category '${category}' (${categoryId})`);

    for await (const pageOfSongs of fetchSongs({ categoryId })) {
      rawSongs.push(...pageOfSongs);
    }
  }
  for (const [bemaniId, bemani] of bemaniCategoryMap.entries()) {
    logger.info(`* bemani '${bemani}' (${bemaniId})`);

    for await (const pageOfSongs of fetchSongs({ bemaniId })) {
      rawSongs.push(...pageOfSongs);
    }
  }

  logger.info("Merging duplicate songs in different versions ...");
  const songs = mergeSongs(rawSongs);
  logger.info(
    `OK, ${rawSongs.length} raw songs merged into ${songs.length} songs.`,
  );
  const outPath1 = path.resolve("scripts/output/songs.json");
  await mkdir(path.dirname(outPath1), { recursive: true });
  await writeFile(outPath1, JSON.stringify(songs, null, 2), "utf8");

  logger.info("Ensuring every song has an unique songId ...");
  ensureNoDuplicateEntry(songs.map((song) => song.songId));

  const sheets = songs.flatMap((rawSong) => extractSheets(rawSong));

  logger.info("Exporting sheets to JSON ...");
  const outPath2 = path.resolve("scripts/output/sheets.json");
  await mkdir(path.dirname(outPath2), { recursive: true });
  await writeFile(outPath2, JSON.stringify(sheets, null, 2), "utf8");
  logger.info(`OK, ${sheets.length} sheets → ${outPath2}`);

  logger.info("Done!");
}

run();
