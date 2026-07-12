import type { User } from "@/src/client/sections/users/types";

/* 스캐폴드용 목업. 실제 데이터는 서버 컴포넌트/쿼리로 주입 예정. */

export const usersMock: User[] = [
  { id: "1", rank: 1, popClass: 182.5, username: "onehunnit", character: "Nyami" },
  { id: "2", rank: 2, popClass: 178.3, username: "mikoto", character: "Mimi" },
  { id: "3", rank: 3, popClass: 171.0, username: "popn_lover", character: "Smile" },
  { id: "4", rank: 4, popClass: 165.8, username: "tatsh_fan", character: "MZD" },
  { id: "5", rank: 5, popClass: 158.2, username: "sana", character: "Lisa" },
  { id: "6", rank: 6, popClass: 150.6, username: "kors_k", character: "Rin" },
  { id: "7", rank: 7, popClass: 142.9, username: "yoshitaka", character: "Timer" },
  { id: "8", rank: 8, popClass: 137.4, username: "wac", character: "Yabby" },
  { id: "9", rank: 9, popClass: 129.1, username: "led", character: "Poe" },
  { id: "10", rank: 10, popClass: 118.7, username: "dj_taka", character: "Aoi" },
];
