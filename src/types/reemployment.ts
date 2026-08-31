import type { Gender } from "@/types/auth";
import type { DiagnosisTimelinePoint, ReadinessStatus } from "@/types/diagnosis";

// 입력 화면 값, 금액은 원 단위 문자열
export interface ReemploymentInput {
  monthlyIncome: string;
}

export interface ReductionRequest {
  current_age: number;
  monthly_expenses: number;
  monthly_pension: number;
  asset: number;
  gender: Gender;
  reemployment_income: number;
}

export interface ReductionResponse {
  current_age: number;
  // 재취업 월 소득, 원 단위
  reemployment_income: number;
  // 월 감액액, 원 단위
  monthly_reduction: number;
  // 감액 후 월 연금액, 원 단위
  reduced_monthly_pension: number;
  // 전액 지급 기준 소득, 원 단위
  full_payment_income_threshold: number;
  // 고갈되지 않으면 null
  depletion_age: number | null;
  depleted: boolean;
  target_age: number;
  status: ReadinessStatus;
  timeline: DiagnosisTimelinePoint[];
}
