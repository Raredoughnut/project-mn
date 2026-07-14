/** 캐릭터 변형 목록 타입 계약. Supabase `character_variants`(+`characters` 조인)를 표시용으로 매핑. */

/** 한 페이지 크기 */
export const PAGE_SIZE = 60;

/** 기본 선택 버전 (최신) */
export const DEFAULT_VERSION = 29;

/** 드롭다운 버전 목록 (최신 29 → 1) */
export const VERSION_OPTIONS: number[] = Array.from(
  { length: 29 },
  (_, i) => 29 - i
);

/** 화면 표시용 캐릭터 변형(= 특정 버전의 아이콘 1개). */
export type CharacterVariant = {
  id: number;
  characterId: number;
  name: string;
  eagateCid: string;
  iconUrl: string;
  version: number | null;
};

/** Supabase `character_variants` 행 (조인 포함). */
export type CharacterVariantRow = {
  id: number;
  character_id: number;
  eagate_cid: string;
  icon_url: string;
  version: number | null;
  // FK(character_id → characters.id) 임베드. supabase 버전에 따라 객체/배열.
  characters: { name: string } | { name: string }[] | null;
};

function characterName(c: CharacterVariantRow["characters"]): string {
  if (!c) return "";
  return Array.isArray(c) ? c[0]?.name ?? "" : c.name;
}

export function mapCharacterVariantRow(
  row: CharacterVariantRow
): CharacterVariant {
  return {
    id: row.id,
    characterId: row.character_id,
    name: characterName(row.characters),
    eagateCid: row.eagate_cid,
    iconUrl: row.icon_url,
    version: row.version,
  };
}
