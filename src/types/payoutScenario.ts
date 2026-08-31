import type { Gender } from "@/types/auth";
import type { DiagnosisTimelinePoint } from "@/types/diagnosis";

export type ScenarioType = "NORMAL" | "EARLY" | "LUMP_SUM" | "INSTALLMENT";

// 화면에서 사용하는 수령방식 키
export type PayoutMethod = "normal" | "early" | "lump" | "split";

export interface PayoutScenarioRequest {
  current_age: number;
  monthly_expenses: number;
  asset: number;
  gender: Gender;
  base_monthly_income: number;
  total_service_years: number;
  early_years?: number;
}

export interface ScenarioOutcome {
  scenario_type: ScenarioType;
  // 고갈되지 않으면 null
  depletion_age: number | null;
  depleted: boolean;
  // 총 수령액, 원 단위
  total_received: number;
  // 손익분기 나이, 없으면 null
  break_even_age: number | null;
  timeline: DiagnosisTimelinePoint[];
}

export interface PayoutScenarioResponse {
  current_age: number;
  scenarios: ScenarioOutcome[];
  best_scenario: ScenarioType;
}

// 비교 표 행, 금액 단위는 만원
export interface PayoutScenarioRow {
  method: PayoutMethod;
  label: string;
  // 월 수령액 표기, 일시금은 미표시
  monthlyAmount: string;
  totalAmount: number;
  depletionAge: number | null;
  breakEvenAge: number | null;
  isOptimal: boolean;
}

// 자산 흐름 그래프용 포인트, 금액 단위는 만원
export interface AssetFlowPoint {
  age: number;
  normal: number;
  early: number;
  lump: number;
  split: number;
}
