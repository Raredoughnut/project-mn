/** 곡목록(악곡) 타입 계약. Supabase `songs` 테이블을 표시용으로 매핑한다. */

/** 난이도 4종 — L(Easy) / N(Normal) / H(Hyper) / EX */
export type Difficulty = "E" | "N" | "H" | "EX";

/** 표시 순서 (좌 → 우) */
export const DIFFICULTY_ORDER: Difficulty[] = ["E", "N", "H", "EX"];

/** 한 페이지 크기 */
export const PAGE_SIZE = 50;

/** 화면 표시용 곡. DB의 level_l/n/h/ex → E/N/H/EX 로 매핑. */
export type Song = {
  id: number;
  title: string;
  genre: string | null;
  artist: string | null;
  imageUrl: string | null;
  levels: Record<Difficulty, number | null>;
};

/** Supabase `songs` 행 (조회 컬럼만). */
export type SongRow = {
  id: number;
  title: string;
  genre: string | null;
  artist: string | null;
  image_url: string | null;
  level_l: number | null;
  level_n: number | null;
  level_h: number | null;
  level_ex: number | null;
};

export function mapSongRow(row: SongRow): Song {
  return {
    id: row.id,
    title: row.title,
    genre: row.genre,
    artist: row.artist,
    imageUrl: row.image_url,
    levels: {
      E: row.level_l,
      N: row.level_n,
      H: row.level_h,
      EX: row.level_ex,
    },
  };
}
