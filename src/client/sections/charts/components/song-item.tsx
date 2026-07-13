import { Music } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Song } from "@/src/client/sections/charts/types";
import { DIFFICULTY_ORDER } from "@/src/client/sections/charts/types";
import { DIFF_META } from "@/src/client/sections/charts/difficulty";

export function SongItem({ song }: { song: Song }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary">
      {/* 배너 (4.1:1) */}
      <div className="flex aspect-[4.1/1] w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary sm:w-44">
        {song.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={song.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <Music className="size-5 text-muted-foreground" aria-hidden />
        )}
      </div>

      {/* 장르 · 곡제목 · 아티스트 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs text-muted-foreground">
          {song.genre ?? "-"}
        </span>
        <span className="truncate text-sm font-semibold text-foreground sm:text-base">
          {song.title}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {song.artist ?? "-"}
        </span>
      </div>

      {/* 난이도 E / N / H / EX */}
      <div className="flex shrink-0 gap-1 sm:gap-1.5">
        {DIFFICULTY_ORDER.map((d) => {
          const level = song.levels[d];
          const meta = DIFF_META[d];
          return (
            <div
              key={d}
              className={cn(
                "flex w-8 flex-col items-center rounded-md py-1 sm:w-9",
                level != null ? meta.className : "bg-muted text-muted-foreground/40"
              )}
            >
              <span className="text-[10px] font-bold leading-none">{meta.label}</span>
              <span className="text-sm font-bold leading-tight tabular-nums">
                {level ?? "–"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
