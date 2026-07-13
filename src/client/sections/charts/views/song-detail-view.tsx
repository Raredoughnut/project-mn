import Link from "next/link";
import { ChevronLeft, Music } from "lucide-react";

import { cn } from "@/lib/utils";
import { DIFFICULTY_ORDER, type SongDetail } from "@/src/client/sections/charts/types";
import { DIFF_META } from "@/src/client/sections/charts/difficulty";
import { getVersionName } from "@/src/client/sections/charts/versions";

function formatDuration(sec: number | null): string {
  if (sec == null) return "-";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatBpm(song: SongDetail): string {
  const { minBpm, avgBpm, maxBpm } = song;
  if (minBpm != null && maxBpm != null && minBpm !== maxBpm) {
    return `${minBpm}–${maxBpm}`;
  }
  const single = avgBpm ?? minBpm ?? maxBpm;
  return single != null ? String(single) : "-";
}

function formatDate(iso: string): string {
  // "2026-07-13T08:03:18Z" → "2026-07-13"
  return iso.slice(0, 10);
}

/** 상세 정보 한 줄 (라벨 / 값). */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 border-b border-border py-3 last:border-0">
      <dt className="w-24 shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 flex-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

/** 곡 상세 (프레젠테이션). 목록의 가로 요소를 세로로 쌓아 보여준다. */
export function SongDetailView({ song }: { song: SongDetail }) {
  const versionName = getVersionName(song.version);
  const categories = song.category?.split("|").filter(Boolean) ?? [];

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 lg:px-10">
      <Link
        href="/charts"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        악곡 목록
      </Link>

      {/* 배너 (4.1:1) */}
      <div className="flex aspect-[4.1/1] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary">
        {song.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={song.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <Music className="size-8 text-muted-foreground" aria-hidden />
        )}
      </div>

      {/* 장르 · 곡제목 · 아티스트 */}
      <div className="mt-5 flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{song.genre ?? "-"}</span>
        <h1 className="text-2xl font-bold text-foreground">{song.title}</h1>
        <span className="text-sm text-muted-foreground">{song.artist ?? "-"}</span>
      </div>

      {/* 난이도 L / N / H / EX */}
      <div className="mt-5 grid grid-cols-4 gap-2">
        {DIFFICULTY_ORDER.map((d) => {
          const level = song.levels[d];
          const meta = DIFF_META[d];
          return (
            <div
              key={d}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg py-2.5",
                level != null ? meta.className : "bg-muted text-muted-foreground/40"
              )}
            >
              <span className="text-xs font-bold leading-none">{meta.label}</span>
              <span className="text-lg font-bold leading-none tabular-nums">
                {level ?? "–"}
              </span>
            </div>
          );
        })}
      </div>

      {/* 부가 정보 */}
      <dl className="mt-6">
        <InfoRow label="버전" value={versionName ?? "-"} />
        <InfoRow
          label="카테고리"
          value={
            categories.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : (
              "-"
            )
          }
        />
        <InfoRow label="BPM" value={formatBpm(song)} />
        <InfoRow label="재생 시간" value={formatDuration(song.durationSeconds)} />
        <InfoRow label="등록일" value={formatDate(song.createdAt)} />
        <InfoRow label="수정일" value={formatDate(song.updatedAt)} />
      </dl>
    </main>
  );
}
