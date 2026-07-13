import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트.
 * secret 키를 사용하며 라우트 핸들러에서만 호출한다 → 키가 브라우저로 노출되지 않음.
 * (publishable/anon 키는 songs 테이블 SELECT 권한이 없어 permission denied 발생.)
 * env 미설정 시 빌드가 깨지지 않도록 최초 호출 시점에 지연 생성한다.
 * 필요한 env:
 *   - SUPABASE_URL
 *   - SUPABASE_SECRET_KEY
 */
let cached: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env가 설정되지 않았습니다. SUPABASE_URL / SUPABASE_SECRET_KEY 를 .env 에 추가하세요."
    );
  }

  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
