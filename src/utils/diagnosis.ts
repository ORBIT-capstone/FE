import { DETAIL_AGE_STEP, LIFE_EXPECTANCY, SUFFICIENT_SCORE } from "@/mocks/diagnosis";
import type { Gender } from "@/stores/profileStore";

export type DiagnosisStatus = "sufficient" | "insufficient";

export interface DiagnosisInput {
  // 현재 나이
  currentAge: string;
  // 월 생활비, 만원 단위
  monthlyExpense: string;
  // 월 연금 수령액, 만원 단위
  monthlyPension: string;
  // 보유 자산, 만원 단위
  assets: string;
  gender: Gender;
}

export interface AssetFlowPoint {
  age: number;
  // 잔여 자산, 만원 단위
  asset: number;
  // 소득 - 지출 누적, 만원 단위
  cumulative: number;
}

export interface AgeDetailRow {
  age: number;
  annualIncome: number;
  annualExpense: number;
  annualShortage: number;
  cumulativeShortage: number;
  asset: number;
}

export interface DiagnosisResult {
  score: number;
  status: DiagnosisStatus;
  lifeExpectancy: number;
  // 고갈되지 않으면 null
  depletionAge: number | null;
  // 월 부족 금액, 만원 단위
  monthlyShortage: number;
  assetFlow: AssetFlowPoint[];
  ageDetails: AgeDetailRow[];
}

// 입력값 기반 임시 진단, API 연동 시 이 함수만 교체 대상
export const calculateDiagnosis = (input: DiagnosisInput): DiagnosisResult => {
  const currentAge = Number(input.currentAge);
  const monthlyExpense = Number(input.monthlyExpense);
  const monthlyPension = Number(input.monthlyPension);
  const initialAsset = Number(input.assets);

  const lifeExpectancy = LIFE_EXPECTANCY[input.gender];
  const annualIncome = monthlyPension * 12;
  const annualExpense = monthlyExpense * 12;
  const annualShortage = annualIncome - annualExpense;
  const monthlyShortage = Math.max(monthlyExpense - monthlyPension, 0);

  const assetFlow: AssetFlowPoint[] = [];
  const ageDetails: AgeDetailRow[] = [];

  let asset = initialAsset;
  let cumulative = 0;
  let depletionAge: number | null = null;

  for (let age = currentAge; age <= lifeExpectancy; age += 1) {
    assetFlow.push({ age, asset: Math.max(asset, 0), cumulative });

    if (asset <= 0 && depletionAge === null) depletionAge = age;

    if ((age - currentAge) % DETAIL_AGE_STEP === 0) {
      ageDetails.push({
        age,
        annualIncome,
        annualExpense,
        annualShortage,
        cumulativeShortage: cumulative,
        asset: Math.max(Math.round(asset), 0),
      });
    }

    asset += annualShortage;
    cumulative += annualShortage;
  }

  // 자산이 버티는 기간 비율 기반 점수
  const survivedYears = (depletionAge ?? lifeExpectancy) - currentAge;
  const targetYears = Math.max(lifeExpectancy - currentAge, 1);
  const score = Math.min(Math.round((survivedYears / targetYears) * 100), 100);

  return {
    score,
    status: score >= SUFFICIENT_SCORE ? "sufficient" : "insufficient",
    lifeExpectancy,
    depletionAge,
    monthlyShortage,
    assetFlow,
    ageDetails,
  };
};

// 자산과 누적 소득-지출이 교차하는 나이
export const findCrossAge = (assetFlow: AssetFlowPoint[]) => {
  const crossPoint = assetFlow.find((point) => point.cumulative >= point.asset);
  return crossPoint?.age ?? null;
};
