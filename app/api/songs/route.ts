import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseServer } from "@/lib/supabase";
import {
  PAGE_SIZE,
  mapSongRow,
  type SongRow,
} from "@/src/client/sections/charts/types";

const SELECT_COLUMNS =
  "id,title,genre,artist,image_url,level_l,level_n,level_h,level_ex";

/**
 * GET /api/songs?page=0&q=검색어
 * songs 를 id 역순으로 50개씩 반환. q 가 있으면 곡명/장르/아티스트 ilike 검색.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(0, Number.parseInt(searchParams.get("page") ?? "0", 10) || 0);
  const q = (searchParams.get("q") ?? "").trim();

  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  try {
    let query = getSupabaseServer()
      .from("songs")
      .select(SELECT_COLUMNS)
      .order("id", { ascending: false })
      .range(from, to);

    // PostgREST or() 문법을 깨뜨리는 문자를 제거한 뒤 검색.
    const safe = q.replace(/[,()*%\\]/g, " ").trim();
    if (safe) {
      query = query.or(
        `title.ilike.%${safe}%,genre.ilike.%${safe}%,artist.ilike.%${safe}%`
      );
    }

    const { data, error } = await query.returns<SongRow[]>();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json((data ?? []).map(mapSongRow));
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
