/**
 * 메인 화면 레이아웃용 타입 계약.
 * 레이아웃 스캐폴드 단계라 백엔드(db/schema) 대신 최소 필드만 자체 정의한다.
 * 실제 데이터 연동 시 서버 스키마 타입으로 교체 예정.
 */

/** 심리테스트 항목 */
export type Test = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  coverImage: string | null;
  scoringType: string;
  status: string;
  authorName: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

/** 캐러셀 배너 항목 (공개 표시에 필요한 필드만) */
export type BannerItem = {
  id: string;
  title: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  linkUrl: string | null;
};

/** 인기 목록 항목: 테스트 + 응시 집계 */
export type PopularTest = Test & { attemptCount: number };

/** 추천 세트 + 미리보기 아이템. items 는 최대 3개(Container/쿼리에서 제한). */
export type CuratedSet = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  createdAt: Date;
  items: Pick<Test, "id" | "slug" | "title" | "coverImage">[];
};

/** 메인 화면 뷰가 받는 데이터 계약 (개발과 합의한 조합 DTO) */
export type HomeData = {
  liveCount?: number;
  banners: BannerItem[];
  popular: PopularTest[];
  latest: Test[];
  sets: CuratedSet[];
};
