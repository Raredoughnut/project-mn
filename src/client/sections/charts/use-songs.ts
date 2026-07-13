"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchSongsPage } from "@/src/client/sections/charts/api";
import { PAGE_SIZE } from "@/src/client/sections/charts/types";

/**
 * 곡목록 무한 스크롤 쿼리.
 * - queryKey 에 검색어 포함 → 검색어 변경 시 자동 리페치·리셋
 * - 마지막 페이지가 PAGE_SIZE 만큼 왔으면 다음 페이지 존재로 간주
 */
export function useSongs(search: string) {
  return useInfiniteQuery({
    queryKey: ["songs", search],
    queryFn: ({ pageParam }) => fetchSongsPage(pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
}
