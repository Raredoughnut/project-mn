import type { RecommendSet } from "@/src/client/sections/recommend/types";

/* 스캐폴드용 목업. 실제 데이터는 서버 컴포넌트/쿼리로 주입 예정. */

export const recommendMock: RecommendSet[] = [
  {
    id: "1",
    no: 1,
    name: "24레벨 입문 세트",
    songs: ["ニエンテ", "Sun Dance", "Anthem"],
    updatedAt: "2026-07-10",
  },
  {
    id: "2",
    no: 2,
    name: "연타 연습 모음",
    songs: ["トロイメライ", "Neon Lights", "운명"],
    updatedAt: "2026-07-08",
  },
  {
    id: "3",
    no: 3,
    name: "계단 특화 세트",
    songs: ["별의 노래", "Island Time", "Anthem"],
    updatedAt: "2026-06-30",
  },
  {
    id: "4",
    no: 4,
    name: "고레벨 도전 EX",
    songs: ["운명", "Anthem", "ニエンテ"],
    updatedAt: "2026-06-25",
  },
  {
    id: "5",
    no: 5,
    name: "초보 추천 세트",
    songs: ["Sun Dance", "별의 노래", "Island Time"],
    updatedAt: "2026-06-15",
  },
  {
    id: "6",
    no: 6,
    name: "롱잡 연습",
    songs: ["Neon Lights", "トロイメライ", "Sun Dance"],
    updatedAt: "2026-05-30",
  },
];
