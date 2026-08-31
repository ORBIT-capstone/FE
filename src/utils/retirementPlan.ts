import { DETAIL_AGE_STEP } from "@/mocks/diagnosis";
import {
  CHART_AGE_STEP,
  EXTRA_INCOME_NEED_RATE,
  HYBRID_EXPENSE_RATE,
  HYBRID_INCOME_RATE,
  HYBRID_SAVING_RATE,
  SAVING_NEED_RATE,
} from "@/mocks/retirementPlan";
import type { AgeDetailRow } from "@/types/diagnosis";

const MAN_WON = 10_000;

export type PlanStatus = "SUFFICIENT" | "INSUFFICIENT";
export type PlanRecommendType = "saving" | "extraIncome" | "hybrid";
export type PlanStatusLevel = "good" | "soso" | "bad";

// 저장된 진단 결과에서 뽑아낸 분석 기준값, 금액 단위는 만원
export interface RetirementPlanBase {
  currentAge: number;
  targetAge: number;
  assets: number;
  monthlyExpense: number;
  monthlyIncome: number;
}

// 그래프용 자산 흐름, 금액 단위는 원
export interface PlanAssetPoint {
  age: number;
  asset: number;
}

export interface RetirementPlanResult {
  currentAge: number;
  targetAge: number;
  // 현재 준비 수준 점수
  score: number;
  currentStatus: PlanStatus;
  // 개선안 적용 시 목표 준비 상태
  targetStatus: PlanStatus;
  depleted: boolean;
  depletionAge: number | null;
  recommendType: PlanRecommendType;
  statusLevel: PlanStatusLevel;
  // 월 개선 금액, 원 단위
  extraSaving: number;
  extraIncome: number;
  expenseAdjust: number;
  assetFlow: PlanAssetPoint[];
  ageDetails: AgeDetailRow[];
}

// 부족액 비율 기준 추천 유형과 개선 금액 배분
const distributeNeed = (needAmount: number, needRate: number) => {
  if (needAmount === 0) {
    return {
      recommendType: "saving" as const,
      statusLevel: "good" as const,
      extraSaving: 0,
      extraIncome: 0,
      expenseAdjust: 0,
    };
  }

  if (needRate <= SAVING_NEED_RATE) {
    return {
      recommendType: "saving" as const,
      statusLevel: "soso" as const,
      extraSaving: needAmount,
      extraIncome: 0,
      expenseAdjust: 0,
    };
  }

  if (needRate <= EXTRA_INCOME_NEED_RATE) {
    return {
      recommendType: "extraIncome" as const,
      statusLevel: "soso" as const,
      extraSaving: 0,
      extraIncome: needAmount,
      expenseAdjust: 0,
    };
  }

  return {
    recommendType: "hybrid" as const,
    statusLevel: "bad" as const,
    extraSaving: Math.round(needAmount * HYBRID_SAVING_RATE),
    extraIncome: Math.round(needAmount * HYBRID_INCOME_RATE),
    expenseAdjust: Math.round(needAmount * HYBRID_EXPENSE_RATE),
  };
};

// 진단 결과 기반 임시 설계, API 연동 시 이 함수만 교체 대상
export const calculateRetirementPlan = (base: RetirementPlanBase): RetirementPlanResult => {
  const months = Math.max((base.targetAge - base.currentAge) * 12, 1);

  // 목표 연령까지 자산을 유지하기 위한 월 부족액, 만원 단위
  const need = Math.max(base.monthlyExpense - base.monthlyIncome - base.assets / months, 0);
  const needRate = base.monthlyExpense === 0 ? 0 : need / base.monthlyExpense;
  const { recommendType, statusLevel, extraSaving, extraIncome, expenseAdjust } = distributeNeed(
    Math.round(need * MAN_WON),
    needRate,
  );

  const annualIncome = Math.round(
    (base.monthlyIncome + (extraSaving + extraIncome) / MAN_WON) * 12,
  );
  const annualExpense = Math.round((base.monthlyExpense - expenseAdjust / MAN_WON) * 12);
  const annualGap = annualIncome - annualExpense;

  const assetFlow: PlanAssetPoint[] = [];
  const ageDetails: AgeDetailRow[] = [];

  let asset = base.assets;
  let cumulativeGap = 0;
  let depletionAge: number | null = null;

  for (let age = base.currentAge; age <= base.targetAge; age += 1) {
    const isLastAge = age === base.targetAge;

    if ((age - base.currentAge) % CHART_AGE_STEP === 0 || isLastAge) {
      assetFlow.push({ age, asset: Math.max(Math.round(asset), 0) * MAN_WON });
    }

    if ((age - base.currentAge) % DETAIL_AGE_STEP === 0 || isLastAge) {
      ageDetails.push({
        age,
        annualIncome,
        annualExpense,
        annualShortage: -annualGap,
        cumulativeShortage: -cumulativeGap,
        asset: Math.max(Math.round(asset), 0),
      });
    }

    // 목표 연령 도달 전 고갈 여부 판정
    if (asset < 0 && depletionAge === null && !isLastAge) depletionAge = age;

    asset += annualGap;
    cumulativeGap += annualGap;
  }

  return {
    currentAge: base.currentAge,
    targetAge: base.targetAge,
    score: Math.round(Math.max(1 - needRate, 0) * 100),
    currentStatus: need > 0 ? "INSUFFICIENT" : "SUFFICIENT",
    targetStatus: "SUFFICIENT",
    depleted: depletionAge !== null,
    depletionAge,
    recommendType,
    statusLevel,
    extraSaving,
    extraIncome,
    expenseAdjust,
    assetFlow,
    ageDetails,
  };
};
