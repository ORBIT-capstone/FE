import type { ReemploymentGrade, ReemploymentInput } from "@/utils/reemployment";
import type { ResultTone } from "@/utils/resultTone";

// 전액 수령 기준 소득, 국민연금 A값 기준이며 API 연동 시 응답값으로 대체
export const FULL_PAYMENT_INCOME_THRESHOLD = 3_097_000;

// 초과소득월액 구간별 감액 기준, base 는 구간 시작 시점 누적 감액액
export const REDUCTION_BRACKETS = [
  { start: 0, limit: 1_000_000, base: 0, rate: 0.05 },
  { start: 1_000_000, limit: 2_000_000, base: 50_000, rate: 0.1 },
  { start: 2_000_000, limit: 3_000_000, base: 150_000, rate: 0.15 },
  { start: 3_000_000, limit: 4_000_000, base: 300_000, rate: 0.2 },
  { start: 4_000_000, limit: Infinity, base: 500_000, rate: 0.25 },
];

// 감액 상한 비율
export const MAX_REDUCTION_RATE = 0.5;

// 재취업 소득 유지 가정 기간, 이후에는 감액 없이 전액 수령
export const REEMPLOYMENT_YEARS = 5;

// 기존 월 연금 수령액, 마이페이지 저장값 연동 전 임시값
export const MOCK_MONTHLY_PENSION = 1_500_000;

// 중간 단계 기준 점수, 이 아래는 부족 단계
export const MODERATE_SCORE = 40;

// 등급별 문구와 강조 색상
export const GRADE_TEXT: Record<
  ReemploymentGrade,
  { label: string; headline: string; description: string; tone: ResultTone }
> = {
  sufficient: {
    label: "충분",
    headline: "충분 단계입니다",
    description:
      "현재 자산과 소득으로\n목표 은퇴 시점까지 안정적인\n생활이 가능할 것으로 예상됩니다",
    tone: "mint",
  },
  moderate: {
    label: "중간",
    headline: "중간 단계입니다",
    description:
      "감액된 연금과 현재 자산으로\n생활은 가능하지만\n여유가 크지 않을 것으로 예상됩니다",
    tone: "yellow",
  },
  insufficient: {
    label: "부족",
    headline: "부족 단계입니다",
    description:
      "감액된 연금과 현재 자산으로는\n목표 은퇴 시점까지 생활을\n유지하기 어려울 것으로 예상됩니다",
    tone: "pink",
  },
};

// 화면 확인용 임시 입력값, API 연동 시 제거 대상
export const MOCK_REEMPLOYMENT_INPUT: ReemploymentInput = {
  currentAge: "45",
  monthlyExpense: "180",
  monthlyPension: "150",
  assets: "10000",
  monthlyIncome: "500",
  gender: "female",
};
