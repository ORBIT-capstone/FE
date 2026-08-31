import type { Gender } from "@/types/auth";
import type { DiagnosisTimelinePoint, ReadinessStatus } from "@/types/diagnosis";

export type RecommendationType = "SUFFICIENT" | "SAVING_ONLY" | "SAVING_AND_INCOME";

export interface RecommendationRequest {
  current_age: number;
  monthly_expenses: number;
  monthly_pension: number;
  asset: number;
  gender: Gender;
}

export interface RecommendationResponse {
  current_age: number;
  recommendation_type: RecommendationType;
  // 월 추가 저축 필요액, 원 단위
  required_saving: number;
  // 월 추가 필요 소득, 원 단위
  required_income: number;
  // 추천 적용 시 목표 준비 상태
  target_status: ReadinessStatus;
  // 고갈되지 않으면 null
  depletion_age: number | null;
  depleted: boolean;
  target_age: number;
  status: ReadinessStatus;
  timeline: DiagnosisTimelinePoint[];
}

// 자산 변화 그래프용 포인트, 금액 단위는 원
export interface PlanAssetPoint {
  age: number;
  asset: number;
}
