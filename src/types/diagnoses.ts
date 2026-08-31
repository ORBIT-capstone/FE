import type { ReadinessStatus, RetirementDiagnosisResponse } from "@/types/diagnosis";
import type { PayoutScenarioResponse } from "@/types/payoutScenario";
import type { ReductionResponse } from "@/types/reemployment";
import type { RecommendationResponse } from "@/types/retirementPlan";
import type { EmployeeSimulateResponse } from "@/types/simulation";

export type DiagnosisType =
  | "EMPLOYEE_PENSION"
  | "RECEIPT_SCENARIOS"
  | "RETIREMENT_ASSET"
  | "PENSION_REDUCTION"
  | "RETIREMENT_RECOMMENDATION";

// 종류별 결과 타입, 계산 API 응답 원본과 동일
export interface DiagnosisResultMap {
  EMPLOYEE_PENSION: EmployeeSimulateResponse;
  RECEIPT_SCENARIOS: PayoutScenarioResponse;
  RETIREMENT_ASSET: RetirementDiagnosisResponse;
  PENSION_REDUCTION: ReductionResponse;
  RETIREMENT_RECOMMENDATION: RecommendationResponse;
}

// 진단 목록 항목
export interface DiagnosisSummary {
  id: number;
  diagnosisType: DiagnosisType;
  // 재직자 연금·수령방식 비교는 최상위 상태가 없어 null
  status: ReadinessStatus | null;
  depletionAge: number | null;
  createdAt: string;
}

// 진단 상세, result 는 저장 당시 계산 응답 원본
export interface DiagnosisDetail<T extends DiagnosisType = DiagnosisType> extends DiagnosisSummary {
  result: DiagnosisResultMap[T];
}

export type DiagnosisGroup = "employed" | "retired";

// 종류별 화면 정보, 상세 경로는 뒤에 저장 ID 를 붙여 사용
export const DIAGNOSIS_META: Record<
  DiagnosisType,
  { title: string; group: DiagnosisGroup; resultPath: string }
> = {
  EMPLOYEE_PENSION: {
    title: "재직자 연금 시뮬레이션",
    group: "employed",
    resultPath: "/pension-scenario/result",
  },
  RECEIPT_SCENARIOS: {
    title: "수령방식별 시나리오 비교",
    group: "employed",
    resultPath: "/payout-scenario/result",
  },
  RETIREMENT_ASSET: {
    title: "은퇴자산 진단",
    group: "retired",
    resultPath: "/diagnosis/result",
  },
  PENSION_REDUCTION: {
    title: "재취업 연금 감액 계산",
    group: "retired",
    resultPath: "/reemployment/detail",
  },
  RETIREMENT_RECOMMENDATION: {
    title: "맞춤 노후 설계",
    group: "retired",
    resultPath: "/retirement-plan",
  },
};
