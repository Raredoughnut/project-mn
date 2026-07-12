import { UserItem } from "@/src/client/sections/users/components/user-item";
import type { User } from "@/src/client/sections/users/types";

interface UsersViewProps {
  users: User[];
}

/** 유저 목록 (프레젠테이션). props(users)만 받아 그린다. */
export function UsersView({ users }: UsersViewProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="mb-4 text-xl font-bold text-foreground">유저</h1>

      {/* 컬럼 헤더 */}
      <div className="flex items-center gap-3 px-4 pb-1 text-xs text-muted-foreground">
        <span className="w-8 shrink-0 text-center">순위</span>
        <span className="w-20 shrink-0">팝클래스</span>
        <span className="min-w-0 flex-1">사용자명</span>
        <span className="w-36 shrink-0 text-right">사용하는 캐릭터</span>
      </div>

      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </main>
  );
}
