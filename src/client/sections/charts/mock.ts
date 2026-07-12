import type { Song } from "@/src/client/sections/charts/types";

/* 스캐폴드용 목업. 실제 데이터는 서버 컴포넌트/쿼리로 주입 예정. */

export const songsMock: Song[] = [
  {
    id: "1",
    genre: "니엔테",
    title: "ニエンテ",
    artist: "TATSH",
    bannerImage: null,
    levels: { E: 10, N: 24, H: 38, EX: 45 },
  },
  {
    id: "2",
    genre: "댄스",
    title: "Sun Dance",
    artist: "DJ YOSHITAKA",
    bannerImage: null,
    levels: { E: 8, N: 20, H: 33, EX: 42 },
  },
  {
    id: "3",
    genre: "발라드",
    title: "별의 노래",
    artist: "모모코",
    bannerImage: null,
    levels: { E: 5, N: 14, H: 26 }, // EX 미수록
  },
  {
    id: "4",
    genre: "하드 렌치",
    title: "Anthem",
    artist: "wac",
    bannerImage: null,
    levels: { E: 12, N: 27, H: 41, EX: 48 },
  },
  {
    id: "5",
    genre: "트로이메라이",
    title: "トロイメライ",
    artist: "Sana",
    bannerImage: null,
    levels: { E: 9, N: 22, H: 35, EX: 43 },
  },
  {
    id: "6",
    genre: "시티팝",
    title: "Neon Lights",
    artist: "kors k",
    bannerImage: null,
    levels: { E: 7, N: 18, H: 30, EX: 39 },
  },
  {
    id: "7",
    genre: "클래식 3",
    title: "운명",
    artist: "L.E.D.",
    bannerImage: null,
    levels: { E: 11, N: 25, H: 39, EX: 47 },
  },
  {
    id: "8",
    genre: "레게",
    title: "Island Time",
    artist: "Reggae Master",
    bannerImage: null,
    levels: { E: 6, N: 16, H: 28 }, // EX 미수록
  },
];
