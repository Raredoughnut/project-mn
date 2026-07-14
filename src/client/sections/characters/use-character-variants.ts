"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchCharacterVariantsPage } from "@/src/client/sections/characters/api";
import { PAGE_SIZE } from "@/src/client/sections/characters/types";

/**
 * 캐릭터 변형 무한 스크롤 쿼리.
 * - queryKey 에 버전 포함 → 버전 변경 시 자동 리페치·리셋
 * - 마지막 페이지가 PAGE_SIZE 만큼 왔으면 다음 페이지 존재로 간주
 */
export function useCharacterVariants(version: number) {
  return useInfiniteQuery({
    queryKey: ["character-variants", version],
    queryFn: ({ pageParam }) => fetchCharacterVariantsPage(version, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
}
