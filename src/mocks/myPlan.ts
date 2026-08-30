export type PlanType =
  "diagnosis" | "pensionSimulation" | "payoutScenario" | "reemployment" | "retirementPlan";

export interface SavedPlan {
  id: string;
  type: PlanType;
  title: string;
  // YYYY.MM.DD 형식
  savedAt: string;
  // 이동할 결과 페이지 경로
  resultPath: string;
}

// 진단 종류별 기본 정보
export const PLAN_PRESET: Record<PlanType, { title: string; resultPath: string }> = {
  diagnosis: { title: "은퇴자산 진단", resultPath: "/diagnosis/result" },
  pensionSimulation: { title: "재직자 연금 시뮬레이션", resultPath: "/pension-scenario/result" },
  payoutScenario: { title: "수령방식별 시나리오 비교", resultPath: "/payout-scenario/result" },
  reemployment: { title: "재취업 연금 감액 계산", resultPath: "/reemployment/detail" },
  retirementPlan: { title: "맞춤 노후 설계", resultPath: "/retirement-plan" },
};

// 재직자·퇴직자 분류
export const EMPLOYED_PLAN_TYPES: PlanType[] = ["pensionSimulation", "payoutScenario"];
export const RETIRED_PLAN_TYPES: PlanType[] = ["diagnosis", "reemployment", "retirementPlan"];

// 화면 확인용 더미 내역, API 연동 시 응답으로 대체
export const MOCK_SAVED_PLANS: SavedPlan[] = [
  { id: "1", type: "diagnosis", savedAt: "2026.08.30", ...PLAN_PRESET.diagnosis },
  { id: "2", type: "pensionSimulation", savedAt: "2026.08.30", ...PLAN_PRESET.pensionSimulation },
  { id: "3", type: "payoutScenario", savedAt: "2026.08.30", ...PLAN_PRESET.payoutScenario },
];
