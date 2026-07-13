import { ChartsView } from "@/src/client/sections/charts/views/charts-view";

/**
 * Charts Container.
 * 곡목록은 검색·무한 스크롤이 있어 클라이언트에서 직접 페칭한다(ChartsView).
 */
export function ChartsContainer() {
  return <ChartsView />;
}
