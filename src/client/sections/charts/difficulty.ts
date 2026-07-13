import type { Difficulty } from "@/src/client/sections/charts/types";

/** 난이도별 라벨·색 (목록·상세 공용). L=파랑 · N=초록 · H=주황 · EX=빨강 */
export const DIFF_META: Record<Difficulty, { label: string; className: string }> = {
  E: { label: "L", className: "bg-blue-lighter text-blue-darker" },
  N: { label: "N", className: "bg-green-lighter text-green-darker" },
  H: { label: "H", className: "bg-orange-lighter text-orange-darker" },
  EX: { label: "EX", className: "bg-red-lighter text-red-darker" },
};
