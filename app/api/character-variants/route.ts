import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseServer } from "@/lib/supabase";
import {
  PAGE_SIZE,
  mapCharacterVariantRow,
  type CharacterVariantRow,
} from "@/src/client/sections/characters/types";

const SELECT_COLUMNS =
  "id,character_id,eagate_cid,icon_url,version,characters(name)";

/**
 * GET /api/character-variants?version=29&page=0
 * character_variants 를 버전으로 필터, character_id·id 순으로 60개씩 반환.
 * characters(name) 을 조인해 캐릭터명을 함께 내려준다.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(
    0,
    Number.parseInt(searchParams.get("page") ?? "0", 10) || 0
  );
  const versionRaw = searchParams.get("version");
  const version = versionRaw != null ? Number.parseInt(versionRaw, 10) : NaN;

  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  try {
    let query = getSupabaseServer()
      .from("character_variants")
      .select(SELECT_COLUMNS)
      .order("character_id", { ascending: true })
      .order("id", { ascending: true })
      .range(from, to);

    if (Number.isFinite(version)) {
      query = query.eq("version", version);
    }

    const { data, error } = await query.returns<CharacterVariantRow[]>();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json((data ?? []).map(mapCharacterVariantRow));
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
