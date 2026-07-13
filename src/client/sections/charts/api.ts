import type { Song } from "@/src/client/sections/charts/types";

/**
 * 곡 페이지 조회 (서버 라우트 경유).
 * 정렬(id 역순)·페이지네이션(50개)·검색은 /api/songs 에서 처리한다.
 */
export async function fetchSongsPage(
  page: number,
  search: string
): Promise<Song[]> {
  const params = new URLSearchParams({ page: String(page) });
  const q = search.trim();
  if (q) params.set("q", q);

  const res = await fetch(`/api/songs?${params.toString()}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? `요청 실패 (${res.status})`);
  }
  return (await res.json()) as Song[];
}
