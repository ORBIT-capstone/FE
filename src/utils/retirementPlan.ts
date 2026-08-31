import { DETAIL_AGE_STEP } from "@/mocks/diagnosis";
import { CHART_AGE_STEP, EXPENSE_ADJUST_LIMIT, EXPENSE_ENOUGH_LIMIT } from "@/mocks/retirementPlan";
import type { AgeDetailRow } from "@/types/diagnosis";
import type { PlanAssetPoint, RecommendationResponse } from "@/types/retirementPlan";

const MAN_WON = 10_000;

export type ExpenseAdjustLevel = "adjust" | "proper" | "enough";

const toManWon = (amount: number) => Math.round(amount / MAN_WON);

// 기대수명 이후 구간 제외
const getTimeline = (result: RecommendationResponse) =>
  result.timeline.filter((point) => point.age <= result.target_age);

// 자산이 버티는 기간 비율 기반 점수, 응답에 없어 프론트에서 산출
export const getScore = (result: RecommendationResponse) => {
  const survivedYears = (result.depletion_age ?? result.target_age) - result.current_age;
  const targetYears = Math.max(result.target_age - result.current_age, 1);

  return Math.min(Math.round((survivedYears / targetYears) * 100), 100);
};

// 생활비 기준 조정 필요액, API 응답에 없어 프론트에서 산출
export const getExpenseAdjust = (monthlyExpense: number) => {
  if (monthlyExpense > EXPENSE_ADJUST_LIMIT) {
    return { level: "adjust" as ExpenseAdjustLevel, amount: monthlyExpense - EXPENSE_ADJUST_LIMIT };
  }

  const level: ExpenseAdjustLevel = monthlyExpense < EXPENSE_ENOUGH_LIMIT ? "enough" : "proper";

  return { level, amount: 0 };
};

// 자산 변화 그래프용 변환, 원 단위 유지
export const toAssetFlow = (result: RecommendationResponse): PlanAssetPoint[] => {
  const timeline = getTimeline(result);

  return timeline
    .filter(
      (point, index) =>
        (point.age - result.current_age) % CHART_AGE_STEP === 0 || index === timeline.length - 1,
    )
    .map((point) => ({ age: point.age, asset: point.asset }));
};

// 연령별 예상 내역용 변환, 10년 단위 추출
export const toAgeDetailRows = (result: RecommendationResponse): AgeDetailRow[] =>
  getTimeline(result)
    .filter((point) => (point.age - result.current_age) % DETAIL_AGE_STEP === 0)
    .map((point) => ({
      age: point.age,
      annualIncome: toManWon(point.annual_income),
      annualExpense: toManWon(point.annual_expense),
      annualShortage: toManWon(point.annual_gap),
      cumulativeShortage: toManWon(point.cumulative_annual_gap),
      asset: toManWon(point.asset),
    }));
