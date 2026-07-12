import { RecommendItem } from "@/src/client/sections/recommend/components/recommend-item";
import type { RecommendSet } from "@/src/client/sections/recommend/types";

interface RecommendViewProps {
  sets: RecommendSet[];
}

/** 추천 세트 목록 (프레젠테이션). props(sets)만 받아 그린다. */
export function RecommendView({ sets }: RecommendViewProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="mb-4 text-xl font-bold text-foreground">추천</h1>

      {/* 컬럼 헤더 */}
      <div className="flex items-center gap-3 px-4 pb-1 text-xs text-muted-foreground">
        <span className="w-10 shrink-0 text-center">번호</span>
        <span className="w-44 shrink-0">세트명</span>
        <span className="min-w-0 flex-1">세트 곡들</span>
        <span className="w-28 shrink-0 text-right">업데이트 날짜</span>
      </div>

      <ul className="flex flex-col gap-2">
        {sets.map((set) => (
          <RecommendItem key={set.id} set={set} />
        ))}
      </ul>
    </main>
  );
}
