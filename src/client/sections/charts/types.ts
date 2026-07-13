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

/** 상세용 곡 — 목록 필드 + 부가 정보. */
export type SongDetail = Song & {
  eagateSongNo: string;
  version: number | null;
  durationSeconds: number | null;
  minBpm: number | null;
  avgBpm: number | null;
  maxBpm: number | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Supabase `songs` 전체 행. */
export type SongDetailRow = SongRow & {
  eagate_song_no: string;
  version: number | null;
  duration_seconds: number | null;
  min_bpm: number | null;
  avg_bpm: number | null;
  max_bpm: number | null;
  category: string | null;
  created_at: string;
  updated_at: string;
};

export function mapSongDetailRow(row: SongDetailRow): SongDetail {
  return {
    ...mapSongRow(row),
    eagateSongNo: row.eagate_song_no,
    version: row.version,
    durationSeconds: row.duration_seconds,
    minBpm: row.min_bpm,
    avgBpm: row.avg_bpm,
    maxBpm: row.max_bpm,
    category: row.category,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
