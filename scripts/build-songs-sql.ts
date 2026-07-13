import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

/* songs.json → public.songs INSERT문(songs.sql) 생성.
   매핑: id→eagate_song_no, title, genre, artist, category, imageUrl→image_url,
        version(이름) → 아래 맵의 인덱스(2자리), 없거나 null → 99. */

const versionMap = new Map<number, string>([
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
]);

const NOT_FOUND_VERSION = 99;

const versionToIndex = new Map<string, number>();
for (const [index, name] of versionMap) versionToIndex.set(name, index);

/** SQL 문자열 리터럴(작은따옴표 이스케이프). null → NULL. */
function sqlStr(value: unknown): string {
  if (value == null) return "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

/** SQL 숫자 리터럴(레벨 등). 숫자 아니거나 null → NULL. */
function sqlNum(value: unknown): string {
  if (value == null) return "NULL";
  const n = Number(value);
  return Number.isFinite(n) ? String(n) : "NULL";
}

function versionIndexOf(name: unknown): number {
  if (typeof name === "string" && versionToIndex.has(name))
    return versionToIndex.get(name)!;
  return NOT_FOUND_VERSION;
}

async function main() {
  const inPath = path.resolve("scripts/output/songs.json");
  const outPath = path.resolve("scripts/output/songs.sql");

  const songs = JSON.parse(await readFile(inPath, "utf8")) as Record<
    string,
    unknown
  >[];

  let mapped = 0;
  let version0 = 0;
  const rows = songs.map((s) => {
    const version = versionIndexOf(s.version);
    if (version !== NOT_FOUND_VERSION) mapped += 1;
    if (version === 0) version0 += 1;
    return (
      "  (" +
      [
        sqlStr(s.id),
        sqlStr(s.title),
        sqlStr(s.genre),
        sqlStr(s.artist),
        sqlStr(s.category),
        String(version),
        sqlStr(s.imageUrl),
        sqlNum(s.lev_light),
        sqlNum(s.lev_normal),
        sqlNum(s.lev_hyper),
        sqlNum(s.lev_ex),
      ].join(", ") +
      ")"
    );
  });

  const sql =
    "INSERT INTO public.songs\n" +
    "  (eagate_song_no, title, genre, artist, category, version, image_url,\n" +
    "   level_l, level_n, level_h, level_ex)\n" +
    "VALUES\n" +
    rows.join(",\n") +
    "\nON CONFLICT (eagate_song_no) DO NOTHING;\n";

  await writeFile(outPath, sql, "utf8");

  console.log(`Wrote ${songs.length} rows → ${outPath}`);
  console.log(
    `  version mapped: ${mapped}, unknown→99: ${songs.length - mapped}`
  );
  if (version0 > 0) console.log(`  version 0(家庭用): ${version0} rows`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
