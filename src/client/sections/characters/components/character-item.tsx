import { Smile } from "lucide-react";

import type { CharacterVariant } from "@/src/client/sections/characters/types";
import { getVersionName } from "@/src/client/sections/charts/versions";

export function CharacterItem({ variant }: { variant: CharacterVariant }) {
  const versionName = getVersionName(variant.version);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-secondary">
      {/* 캐릭터 아이콘 (정사각) */}
      <div className="flex size-6 shrink-0 items-center justify-center overflow-hidden bg-secondary">
        {variant.iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={variant.iconUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Smile className="size-5 text-muted-foreground" aria-hidden />
        )}
      </div>

      {/* 이름 · 버전 · cid */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-foreground sm:text-base">
          {variant.name || "-"}
        </span>
      </div>
    </div>
  );
}
