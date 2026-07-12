import { ChartsView } from "@/src/client/sections/charts/views/charts-view";
import { songsMock } from "@/src/client/sections/charts/mock";

/**
 * Charts Container (서버 컴포넌트).
 * 초기 데이터 획득·분기 담당 → View에는 props만 전달 (MVVM).
 * 스캐폴드 단계라 목업을 주입한다. 실제 쿼리 연동 시 교체 예정.
 */
export function ChartsContainer() {
  const songs = songsMock;
  return <ChartsView songs={songs} />;
}
