/** 곡목록(악곡) 타입 계약. 팝픈뮤직 규격을 따른다. */

/** 난이도 4종 — Easy / Normal / Hyper / EX */
export type Difficulty = "E" | "N" | "H" | "EX";

/** 표시 순서 (좌 → 우) */
export const DIFFICULTY_ORDER: Difficulty[] = ["E", "N", "H", "EX"];

/** 곡 한 개. levels 는 없는 난이도(예: EX 미수록)를 생략할 수 있다. */
export type Song = {
  id: string;
  genre: string;
  title: string;
  artist: string;
  bannerImage: string | null;
  levels: Partial<Record<Difficulty, number>>;
};
