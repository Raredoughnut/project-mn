import { CharactersView } from "@/src/client/sections/characters/views/characters-view";

/**
 * Characters Container.
 * 버전 필터·무한 스크롤이 있어 클라이언트에서 직접 페칭한다(CharactersView).
 */
export function CharactersContainer() {
  return <CharactersView />;
}
