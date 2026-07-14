"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Smile, Users, Sparkles, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/charts", label: "악곡", Icon: Music },
  { href: "/characters", label: "캐릭터", Icon: Smile },
  { href: "/users", label: "유저", Icon: Users },
  { href: "/recommend", label: "추천", Icon: Sparkles },
];

/** 로고 옆 주요 내비게이션 (아이콘-텍스트). 현재 경로를 강조한다. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-0.5 sm:gap-1">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
