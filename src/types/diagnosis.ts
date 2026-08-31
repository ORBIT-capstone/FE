import type { Gender } from "@/types/auth";

// 준비 상태, 세 API 공통
export type ReadinessStatus = "SUFFICIENT" | "MIDDLE" | "INSUFFICIENT";

// 입력 화면 값, 금액은 원 단위 문자열
export interface DiagnosisInput {
  currentAge: string;
  monthlyExpense: string;
  monthlyPension: string;
  assets: string;
  gender: Gender;
}

export interface RetirementDiagnosisRequest {
  current_age: number;
  monthly_expenses: number;
  monthly_pension: number;
  asset: number;
  gender: Gender;
}

// 연도별 자산 흐름, 금액 단위는 원
export interface DiagnosisTimelinePoint {
  age: number;
  asset: number;
  annual_income: number;
  annual_expense: number;
  // 지출 - 소득, 부족하면 양수
  annual_gap: number;
  cumulative_annual_gap: number;
}

export interface RetirementDiagnosisResponse {
  current_age: number;
  // 월 부족 금액, 원 단위
  monthly_gap: number;
  // 고갈되지 않으면 null
  depletion_age: number | null;
  depleted: boolean;
  target_age: number;
  status: ReadinessStatus;
  timeline: DiagnosisTimelinePoint[];
}

// 자산 변화 그래프용 포인트, 금액 단위는 만원
export interface AssetFlowPoint {
  age: number;
  asset: number;
  // 누적 부족액
  cumulative: number;
}

// 연령별 상세 내역 행, 금액 단위는 만원
export interface AgeDetailRow {
  age: number;
  annualIncome: number;
  annualExpense: number;
  // 부족하면 양수
  annualShortage: number;
  cumulativeShortage: number;
  asset: number;
}
