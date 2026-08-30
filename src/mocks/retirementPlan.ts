import type { PlanRecommendType, PlanStatusLevel } from "@/utils/retirementPlan";

// 개선안 배분 기준 비율, API 연동 시 응답값으로 대체
export const SAVING_NEED_RATE = 0.15;
export const EXTRA_INCOME_NEED_RATE = 0.4;
export const HYBRID_SAVING_RATE = 0.4;
export const HYBRID_INCOME_RATE = 0.4;
export const HYBRID_EXPENSE_RATE = 0.2;

// 자산 변화 그래프 표기 단위
export const CHART_AGE_STEP = 2;

// 추천 유형별 문구
export const RECOMMEND_TYPE_TEXT: Record<
  PlanRecommendType,
  { title: string; description: string }
> = {
  saving: {
    title: "저축을 통한 노후 준비",
    description:
      "매월 일정 금액을 추가로 저축하면 목표 연령까지 자산을 안정적으로 유지할 수 있어요.",
  },
  extraIncome: {
    title: "추가 소득을 통한 노후 준비",
    description: "추가 소득을 마련하면 목표 연령까지 자산을 안정적으로 유지할 수 있어요.",
  },
  hybrid: {
    title: "저축과 추가 소득을 통한 노후 준비",
    description:
      "저축과 추가 소득을 함께 마련하면 목표 연령까지 자산을 안정적으로 유지할 수 있어요.",
  },
};

// 상태 단계별 설명 문구
export const STATUS_LEVEL_TEXT: Record<PlanStatusLevel, string> = {
  good: "현재 계획만으로도\n목표 연령까지 자산을 유지할 수 있습니다.",
  soso: "목표 연령 이전 자산이 부족해질\n가능성이 있습니다.",
  bad: "목표 연령 이전 자산이 고갈될\n가능성이 높습니다.",
};

export type ImprovementKey = "saving" | "income" | "expense";

// 개선안 카드 문구
export const IMPROVEMENT_TEXT: Record<
  ImprovementKey,
  { title: string; prefix: string; suffix: string }
> = {
  saving: {
    title: "추가 저축 필요액",
    prefix: "목표 연령까지 자산을 유지하려면 현재 월 생활비 외에",
    suffix: "의 추가 저축이 필요합니다.",
  },
  income: {
    title: "추가 필요 소득",
    prefix: "목표 연령까지 자산을 유지하려면 현재 소득 외에",
    suffix: "의 추가 소득이 필요합니다.",
  },
  expense: {
    title: "월 생활비 조정",
    prefix: "목표 연령까지 자산을 유지하려면 현재 월 생활비 대비",
    suffix: "의 지출 조정이 필요합니다.",
  },
};
