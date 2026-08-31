import { DETAIL_AGE_STEP } from "@/mocks/diagnosis";
import type { AgeDetailRow, AssetFlowPoint } from "@/types/diagnosis";
import type { ReductionResponse } from "@/types/reemployment";

const MAN_WON = 10_000;

const toManWon = (amount: number) => Math.round(amount / MAN_WON);

// 기대수명 이후 구간 제외
const getTimeline = (result: ReductionResponse) =>
  result.timeline.filter((point) => point.age <= result.target_age);

// 자산이 버티는 기간 비율 기반 점수, 응답에 없어 프론트에서 산출
export const getScore = (result: ReductionResponse) => {
  const survivedYears = (result.depletion_age ?? result.target_age) - result.current_age;
  const targetYears = Math.max(result.target_age - result.current_age, 1);

  return Math.min(Math.round((survivedYears / targetYears) * 100), 100);
};

// 감액 전 월 연금 수령액
export const getOriginalPension = (result: ReductionResponse) =>
  result.reduced_monthly_pension + result.monthly_reduction;

// 감액률, 소수점 첫째 자리까지
export const getReductionRate = (result: ReductionResponse) => {
  const originalPension = getOriginalPension(result);
  if (originalPension === 0) return 0;

  return Math.round((result.monthly_reduction / originalPension) * 1000) / 10;
};

// 자산 변화 그래프용 변환
export const toAssetFlow = (result: ReductionResponse): AssetFlowPoint[] =>
  getTimeline(result).map((point) => ({
    age: point.age,
    asset: toManWon(point.asset),
    cumulative: toManWon(point.cumulative_annual_gap),
  }));

// 연령별 상세 내역용 변환, 10년 단위 추출
export const toAgeDetailRows = (result: ReductionResponse): AgeDetailRow[] =>
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
