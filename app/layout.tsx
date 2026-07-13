import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/src/client/layouts/site-header";
import QueryProvider from "@/src/components/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mn.arc 팝픈뮤직 인포",
  description: "팝픈뮤직의 기록을 보다 쉽게 확인하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        geistSans.variable,
      )}
    >
      <head>
        {/* 본문·UI = Pretendard / 디스플레이·헤드라인 = SUIT (둘 다 SIL OFL).
            TODO(운영): 자가호스팅(next/font/local, woff2)으로 전환해 외부 의존·CLS 제거. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendard-variable.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/variable/woff2/SUIT.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <SiteHeader />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
