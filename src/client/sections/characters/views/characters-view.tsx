"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { CharacterItem } from "@/src/client/sections/characters/components/character-item";
import { useCharacterVariants } from "@/src/client/sections/characters/use-character-variants";
import {
  DEFAULT_VERSION,
  VERSION_OPTIONS,
} from "@/src/client/sections/characters/types";
import { getVersionName } from "@/src/client/sections/charts/versions";

/** 캐릭터 목록 (클라이언트). 버전 드롭다운(기본 최신 29) + 무한 스크롤(가상화). */
export function CharactersView() {
  const [version, setVersion] = useState(DEFAULT_VERSION);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCharacterVariants(version);

  const variants = useMemo(() => data?.pages.flat() ?? [], [data]);

  const parentRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual 반환값은 메모이즈 대상이 아니며 런타임상 안전
  const rowVirtualizer = useVirtualizer({
    count: variants.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  // 마지막 아이템에 근접하면 다음 페이지 로드
  useEffect(() => {
    const last = virtualItems[virtualItems.length - 1];
    if (!last) return;
    if (
      last.index >= variants.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    variants.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <main className="mx-auto flex h-[calc(100svh-3.5rem)] w-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3 py-4">
        <h1 className="shrink-0 text-xl font-bold text-foreground">캐릭터</h1>
        <select
          value={version}
          onChange={(e) => setVersion(Number(e.target.value))}
          aria-label="버전 선택"
          className="h-10 min-w-0 rounded-full border border-border bg-muted px-4 text-sm text-foreground outline-none focus:border-primary"
        >
          {VERSION_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {getVersionName(v) ?? `버전 ${v}`}
            </option>
          ))}
        </select>
      </div>

      {/* 스크롤 영역 */}
      <div ref={parentRef} className="min-h-0 flex-1 overflow-auto pb-4">
        {isLoading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            불러오는 중…
          </p>
        ) : isError ? (
          <p className="py-16 text-center text-sm text-destructive">
            불러오지 못했습니다:{" "}
            {error instanceof Error ? error.message : "알 수 없는 오류"}
          </p>
        ) : variants.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            이 버전의 캐릭터가 없습니다.
          </p>
        ) : (
          <div
            className="relative w-full"
            style={{ height: rowVirtualizer.getTotalSize() }}
          >
            {virtualItems.map((vi) => {
              const variant = variants[vi.index];
              return (
                <div
                  key={vi.key}
                  data-index={vi.index}
                  ref={rowVirtualizer.measureElement}
                  className="absolute left-0 top-0 w-full pb-2"
                  style={{ transform: `translateY(${vi.start}px)` }}
                >
                  <CharacterItem variant={variant} />
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
