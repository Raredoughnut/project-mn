import { UsersView } from "@/src/client/sections/users/views/users-view";
import { usersMock } from "@/src/client/sections/users/mock";

/**
 * Users Container (서버 컴포넌트).
 * 초기 데이터 획득·분기 담당 → View에는 props만 전달 (MVVM).
 * 스캐폴드 단계라 목업을 주입한다. 실제 쿼리 연동 시 교체 예정.
 */
export function UsersContainer() {
  const users = usersMock;
  return <UsersView users={users} />;
}
