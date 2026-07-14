import * as cheerio from "cheerio";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

const DATA_URL = "https://p.eagate.573.jp";
const VERSION_ID = "popn29";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const characters: {
    id: string;
    name: string;
    variants: { cid: string; icon: string; version: number }[];
  }[] = [];

  for (let i = 1; i <= 29; i++) {
    let verIndex = 1;

    for (let j = 0; j < 100; j++) {
      const url = new URL(
        `${DATA_URL}/game/popn/${VERSION_ID}/character/index.html`,
      );
      url.searchParams.set("version", String(i));
      url.searchParams.set("page", String(j));

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch page ${i}: ${response.status} ${response.statusText}`,
        );
      }
      const html = await response.text();

      const $ = cheerio.load(html);

      const charaList = $("#chara_list li")
        .map((_, li) => {
          const cid = $(li).attr('data-cid')?.trim() ?? '';
          const icon =
            $(li).find("p:nth-of-type(1) img").attr("src")?.trim() ?? "";
          const name = $(li).find("p:nth-of-type(2)").text().trim();
          const version = i;

          return { cid, icon, name, version };
        })
        .get();

      if (charaList.length <= 0) {
        break;
      }

      for (const chara of charaList) {
        const existing = characters.find((c) => c.name === chara.name);
        if (existing) {
          const dup = existing.variants.some(
            (v) => v.version === chara.version && v.icon === chara.icon,
          );
          if (!dup)
            existing.variants.push({
              cid: chara.cid,
              icon: chara.icon,
              version: chara.version,
            });
        } else {
          characters.push({
            id: chara.version.toString() + verIndex.toString().padStart(3, "0"),
            name: chara.name,
            variants: [{ cid: chara.cid, icon: chara.icon, version: chara.version }],
          });
          verIndex++;
        }
      }
      console.log(`Fetched characters for version ${i}, page ${j}`);
      await sleep(500);
    }
  }

  const outPath1 = path.resolve("scripts/output/characters.json");
  await mkdir(path.dirname(outPath1), { recursive: true });
  await writeFile(outPath1, JSON.stringify(characters, null, 2), "utf8");

  console.log(`Saved characters to ${outPath1}`);
}

run();
