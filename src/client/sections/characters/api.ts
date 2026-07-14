import type { CharacterVariant } from "@/src/client/sections/characters/types";

/**
 * 캐릭터 변형 페이지 조회 (서버 라우트 경유).
 * 버전 필터·정렬·페이지네이션(60개)은 /api/character-variants 에서 처리한다.
 */
export async function fetchCharacterVariantsPage(
  version: number,
  page: number
): Promise<CharacterVariant[]> {
  const params = new URLSearchParams({
    page: String(page),
    version: String(version),
  });

  const res = await fetch(`/api/character-variants?${params.toString()}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `요청 실패 (${res.status})`);
  }
  return (await res.json()) as CharacterVariant[];
}
