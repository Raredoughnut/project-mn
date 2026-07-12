/** 추천 세트 타입 계약. 에디터가 연습용으로 채보를 묶어 제공한다. */

export type RecommendSet = {
  id: string;
  /** 번호 */
  no: number;
  /** 세트명 */
  name: string;
  /** 세트 곡들 (곡제목) */
  songs: string[];
  /** 업데이트 날짜 (yyyy-MM-dd) */
  updatedAt: string;
};
