import { cn } from "@/lib/utils";
import type { User } from "@/src/client/sections/users/types";

export function UserItem({ user }: { user: User }) {
  const topRank = user.rank <= 3;

  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
      {/* 순위 */}
      <span
        className={cn(
          "w-8 shrink-0 text-center text-sm font-bold tabular-nums",
          topRank ? "text-primary" : "text-foreground"
        )}
      >
        {user.rank}
      </span>

      {/* 팝클래스 (0 ~ 185.0) */}
      <span className="w-20 shrink-0">
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-sm font-semibold tabular-nums text-foreground">
          {user.popClass.toFixed(1)}
        </span>
      </span>

      {/* 사용자명 */}
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {user.username}
      </span>

      {/* 사용하는 캐릭터 */}
      <div className="flex w-36 shrink-0 items-center justify-end gap-2">
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-lighter text-[10px] font-bold text-primary-darker"
          aria-hidden
        >
          {user.character.charAt(0)}
        </span>
        <span className="truncate text-sm text-muted-foreground">
          {user.character}
        </span>
      </div>
    </li>
  );
}
