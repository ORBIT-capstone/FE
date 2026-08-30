import { DETAIL_AGE_STEP, LIFE_EXPECTANCY, SUFFICIENT_SCORE } from "@/mocks/diagnosis";
import {
  FULL_PAYMENT_INCOME_THRESHOLD,
  MAX_REDUCTION_RATE,
  MODERATE_SCORE,
  REDUCTION_BRACKETS,
  REEMPLOYMENT_YEARS,
} from "@/mocks/reemployment";
import type { Gender } from "@/stores/profileStore";
import type { AgeDetailRow, AssetFlowPoint } from "@/utils/diagnosis";

const MAN_WON = 10_000;

export type ReemploymentStatus = "SUFFICIENT" | "INSUFFICIENT";

// 점수 구간별 준비 등급, API status 는 2단계라 점수 기준으로 판정
export type ReemploymentGrade = "sufficient" | "moderate" | "insufficient";

export interface ReemploymentInput {
  // 현재 나이
  currentAge: string;
  // 월 생활비, 만원 단위
  monthlyExpense: string;
  // 감액 전 월 연금 수령액, 만원 단위
  monthlyPension: string;
  // 보유 자산, 만원 단위
  assets: string;
  // 재취업 월 소득, 만원 단위
  monthlyIncome: string;
  gender: Gender;
}

// 연도별 자산 흐름, 금액 단위는 만원
export interface ReemploymentTimelinePoint {
  age: number;
  asset: number;
  annual_income: number;
  annual_expense: number;
  annual_gap: number;
  cumulative_annual_gap: number;
}

// API 응답 형식, 월 단위 금액은 원 timeline 금액은 만원
export interface ReemploymentResult {
  current_age: number;
  reemployment_income: number;
  monthly_reduction: number;
  reduced_monthly_pension: number;
  full_payment_income_threshold: number;
  depletion_age: number | null;
  depleted: boolean;
  target_age: number;
  status: ReemploymentStatus;
  timeline: ReemploymentTimelinePoint[];
}

// 초과소득월액 구간별 감액액 산출
const calculateReduction = (excessIncome: number) => {
  const bracket = REDUCTION_BRACKETS.find((item) => excessIncome < item.limit);
  if (!bracket) return 0;

  return bracket.base + (excessIncome - bracket.start) * bracket.rate;
};

// 입력값 기반 임시 계산, API 연동 시 이 함수만 교체 대상
export const calculateReemployment = (input: ReemploymentInput): ReemploymentResult => {
  const currentAge = Number(input.currentAge);
  const targetAge = LIFE_EXPECTANCY[input.gender];

  const monthlyExpense = Number(input.monthlyExpense) * MAN_WON;
  const monthlyPension = Number(input.monthlyPension) * MAN_WON;
  const monthlyIncome = Number(input.monthlyIncome) * MAN_WON;

  const excessIncome = Math.max(monthlyIncome - FULL_PAYMENT_INCOME_THRESHOLD, 0);
  const monthlyReduction = Math.round(
    Math.min(calculateReduction(excessIncome), monthlyPension * MAX_REDUCTION_RATE),
  );
  const reducedMonthlyPension = monthlyPension - monthlyReduction;

  const annualExpense = Math.round((monthlyExpense * 12) / MAN_WON);
  const timeline: ReemploymentTimelinePoint[] = [];

  let asset = Number(input.assets);
  let cumulativeGap = 0;
  let depletionAge: number | null = null;

  for (let age = currentAge; age <= targetAge; age += 1) {
    // 재취업 소득 유지 기간에만 감액 연금과 근로소득 합산
    const isWorking = age < currentAge + REEMPLOYMENT_YEARS;
    const monthlyTotal = isWorking ? reducedMonthlyPension + monthlyIncome : monthlyPension;
    const annualIncome = Math.round((monthlyTotal * 12) / MAN_WON);
    const annualGap = annualIncome - annualExpense;

    timeline.push({
      age,
      asset: Math.max(Math.round(asset), 0),
      annual_income: annualIncome,
      annual_expense: annualExpense,
      annual_gap: annualGap,
      cumulative_annual_gap: cumulativeGap,
    });

    if (asset <= 0 && depletionAge === null) depletionAge = age;

    asset += annualGap;
    cumulativeGap += annualGap;
  }

  const score = calculateScore(currentAge, targetAge, depletionAge);

  return {
    current_age: currentAge,
    reemployment_income: monthlyIncome,
    monthly_reduction: monthlyReduction,
    reduced_monthly_pension: reducedMonthlyPension,
    full_payment_income_threshold: FULL_PAYMENT_INCOME_THRESHOLD,
    depletion_age: depletionAge,
    depleted: depletionAge !== null,
    target_age: targetAge,
    status: score >= SUFFICIENT_SCORE ? "SUFFICIENT" : "INSUFFICIENT",
    timeline,
  };
};

// 자산이 버티는 기간 비율 기반 점수
export const calculateScore = (
  currentAge: number,
  targetAge: number,
  depletionAge: number | null,
) => {
  const survivedYears = (depletionAge ?? targetAge) - currentAge;
  const targetYears = Math.max(targetAge - currentAge, 1);

  return Math.min(Math.round((survivedYears / targetYears) * 100), 100);
};

// 결과값 기준 점수
export const getScore = (result: ReemploymentResult) =>
  calculateScore(result.current_age, result.target_age, result.depletion_age);

// 점수 구간별 등급
export const getGrade = (score: number): ReemploymentGrade => {
  if (score >= SUFFICIENT_SCORE) return "sufficient";

  return score >= MODERATE_SCORE ? "moderate" : "insufficient";
};

// 감액 전 월 연금 수령액
export const getOriginalPension = (result: ReemploymentResult) =>
  result.reduced_monthly_pension + result.monthly_reduction;

// 감액률, 소수점 첫째 자리까지
export const getReductionRate = (result: ReemploymentResult) => {
  const originalPension = getOriginalPension(result);
  if (originalPension === 0) return 0;

  return Math.round((result.monthly_reduction / originalPension) * 1000) / 10;
};

// 자산 변화 그래프용 변환
export const toAssetFlow = (result: ReemploymentResult): AssetFlowPoint[] =>
  result.timeline.map((point) => ({
    age: point.age,
    asset: point.asset,
    cumulative: point.cumulative_annual_gap,
  }));

// 연령별 상세 내역용 변환, 10년 단위 추출
export const toAgeDetailRows = (result: ReemploymentResult): AgeDetailRow[] =>
  result.timeline
    .filter((point) => (point.age - result.current_age) % DETAIL_AGE_STEP === 0)
    .map((point) => ({
      age: point.age,
      annualIncome: point.annual_income,
      annualExpense: point.annual_expense,
      annualShortage: point.annual_gap,
      cumulativeShortage: point.cumulative_annual_gap,
      asset: point.asset,
    }));
