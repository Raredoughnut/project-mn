import Link from "next/link";
import { LogIn } from "lucide-react";

import { SiteNav } from "@/src/client/layouts/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-10">
        <Link href="/" aria-label="mnarc 홈" className="shrink-0">
          {/* 벡터 아웃라인 로고(폰트 비의존) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mnarc-logo.svg" alt="mnarc-logo" style={{ color: "#b57a0e" }} className="h-5 w-auto" />
        </Link>

        <SiteNav />

        <Link
          href="/login"
          className="ml-auto inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          <LogIn className="size-4 shrink-0" />
          로그인
        </Link>
      </div>
    </header>
  );
}
