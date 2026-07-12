/** 유저 목록 타입 계약. */

export type User = {
  id: string;
  /** 순위 */
  rank: number;
  /** 팝클래스 (0 ~ 185.0) */
  popClass: number;
  /** 사용자명 */
  username: string;
  /** 사용하는 캐릭터 */
  character: string;
};
