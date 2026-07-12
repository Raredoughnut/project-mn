import type { RecommendSet } from "@/src/client/sections/recommend/types";

export function RecommendItem({ set }: { set: RecommendSet }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3">
      {/* 번호 */}
      <span className="w-10 shrink-0 pt-0.5 text-center text-sm font-bold tabular-nums text-foreground">
        {set.no}
      </span>

      {/* 세트명 */}
      <span className="w-44 shrink-0 truncate pt-0.5 text-sm font-medium text-foreground">
        {set.name}
      </span>

      {/* 세트 곡들 */}
      <div className="flex min-w-0 flex-1 flex-wrap gap-1">
        {set.songs.map((song, i) => (
          <span
            key={`${set.id}-${i}`}
            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
          >
            {song}
          </span>
        ))}
      </div>

      {/* 업데이트 날짜 */}
      <span className="w-28 shrink-0 pt-0.5 text-right text-sm tabular-nums text-muted-foreground">
        {set.updatedAt}
      </span>
    </li>
  );
}
