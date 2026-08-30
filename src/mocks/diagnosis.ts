import type { Gender } from "@/stores/profileStore";

// 성별 기대수명, API 연동 시 응답값으로 대체
export const LIFE_EXPECTANCY: Record<Gender, number> = {
  male: 84,
  female: 87,
};

// 충분 판정 기준 점수
export const SUFFICIENT_SCORE = 70;

// 연령별 상세 내역 제공 단위
export const DETAIL_AGE_STEP = 10;

// 화면 확인용 임시 입력값, API 연동 시 제거 대상
export const MOCK_DIAGNOSIS_INPUT = {
  currentAge: "45",
  monthlyExpense: "180",
  monthlyPension: "250",
  assets: "10000",
  gender: "female" as const,
};
