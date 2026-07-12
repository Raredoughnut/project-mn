import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary-lighter via-white to-primary-light px-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/mnarc-logo.svg"
        alt="mnarc-logo"
        style={{ color: "#b57a0e" }}
        className="h-10 w-auto"
      />

      <p className="text-lg font-medium text-primary-darker sm:text-xl">
        팝픈뮤직의 기록을 보다 쉽게 확인하세요!
      </p>

      <Link
        href="/login"
        className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
      >
        로그인하기
      </Link>
    </div>
  );
}
