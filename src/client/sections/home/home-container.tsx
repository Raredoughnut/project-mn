import { HomeView } from "@/src/client/sections/home/views/home-view";
import { homeMock } from "@/src/client/sections/home/mock";

/**
 * Home Container (서버 컴포넌트).
 * 초기 데이터 획득·분기 담당 → View에는 props만 전달 (MVVM).
 * 레이아웃 스캐폴드 단계라 목업을 주입한다. 실제 쿼리 연동 시 교체 예정.
 */
export function HomeContainer() {
  const data = homeMock;
  return <HomeView data={data} />;
}
