/**
 * 팝픈뮤직 버전 번호 → 버전명 매핑 (best-effort).
 * DB `songs.version`(0~29, 99=기타)을 표시용 이름으로 변환한다.
 * 이름이 실제와 다르면 이 표만 수정하면 됨.
 */
const VERSION_NAMES: Record<number, string> = {
  1: "pop'n music",
  2: "pop'n music 2",
  3: "pop'n music 3",
  4: "pop'n music 4",
  5: "pop'n music 5",
  6: "pop'n music 6",
  7: "pop'n music 7",
  8: "pop'n music 8",
  9: "pop'n music 9",
  10: "pop'n music 10",
  11: "pop'n music 11",
  12: "pop'n music 12 いろは",
  13: "pop'n music 13 カーニバル",
  14: "pop'n music 14 FEVER!",
  15: "pop'n music 15 ADVENTURE",
  16: "pop'n music 16 PARTY♪",
  17: "pop'n music 17 THE MOVIE",
  18: "pop'n music 18 せんごく列伝",
  19: "pop'n music 19 TUNE STREET",
  20: "pop'n music 20 fantasia",
  21: "pop'n music Sunny Park",
  22: "pop'n music ラピストリア",
  23: "pop'n music éclale",
  24: "pop'n music うさぎと猫と少年の夢",
  25: "pop'n music peace",
  26: "pop'n music 解明リドルズ",
  27: "pop'n music UniLab",
  28: "pop'n music Jam&Fizz",
  29: "pop'n music High☆Cheers!!",
  99: "기타",
};

/** 버전명. 매핑에 없으면 `버전 {n}`, null 이면 null. */
export function getVersionName(version: number | null): string | null {
  if (version == null) return null;
  return VERSION_NAMES[version] ?? `버전 ${version}`;
}
