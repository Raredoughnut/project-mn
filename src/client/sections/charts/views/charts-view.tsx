"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { SongItem } from "@/src/client/sections/charts/components/song-item";
import { useSongs } from "@/src/client/sections/charts/use-songs";

/** 곡목록 (클라이언트). 검색 + id 역순 무한 스크롤(가상화). */
export function ChartsView() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  // 입력 디바운스(300ms) → 실제 쿼리 트리거
  useEffect(() => {
    const timer = setTimeout(() => setSearch(input), 300);
    return () => clearTimeout(timer);
  }, [input]);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSongs(search);

  const songs = useMemo(() => data?.pages.flat() ?? [], [data]);

  const parentRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual 반환값은 메모이즈 대상이 아니며 런타임상 안전
  const rowVirtualizer = useVirtualizer({
    count: songs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 92,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  // 마지막 아이템에 근접하면 다음 페이지 로드
  useEffect(() => {
    const last = virtualItems[virtualItems.length - 1];
    if (!last) return;
    if (last.index >= songs.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualItems, songs.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="mx-auto flex h-[calc(100svh-3.5rem)] w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3 py-4">
        <h1 className="shrink-0 text-xl font-bold text-foreground">악곡</h1>
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-muted px-4 lg:max-w-md">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="곡명 · 장르 · 아티스트 검색"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="곡 검색"
            autoComplete="off"
          />
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div ref={parentRef} className="min-h-0 flex-1 overflow-auto pb-4">
        {isLoading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            불러오는 중…
          </p>
        ) : isError ? (
          <p className="py-16 text-center text-sm text-destructive">
            불러오지 못했습니다: {error instanceof Error ? error.message : "알 수 없는 오류"}
          </p>
        ) : songs.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            {search ? "검색 결과가 없습니다." : "곡이 없습니다."}
          </p>
        ) : (
          <div
            className="relative w-full"
            style={{ height: rowVirtualizer.getTotalSize() }}
          >
            {virtualItems.map((vi) => {
              const song = songs[vi.index];
              return (
                <div
                  key={vi.key}
                  data-index={vi.index}
                  ref={rowVirtualizer.measureElement}
                  className="absolute left-0 top-0 w-full pb-2"
                  style={{ transform: `translateY(${vi.start}px)` }}
                >
                  <SongItem song={song} />
                </div>
              );
            })}
          </div>
        )}

        {isFetchingNextPage ? (
          <p className="py-4 text-center text-xs text-muted-foreground">
            더 불러오는 중…
          </p>
        ) : null}
      </div>
    </main>
  );
}
