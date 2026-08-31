import type { ReadinessStatus } from "@/types/diagnosis";
import type { RecommendationType } from "@/types/retirementPlan";

// 자산 변화 그래프 표기 단위
export const CHART_AGE_STEP = 2;

// 생활비 조정 판단 기준, 원 단위
export const EXPENSE_ADJUST_LIMIT = 1_200_000;
export const EXPENSE_ENOUGH_LIMIT = 800_000;

// 추천 유형별 문구
export const RECOMMEND_TYPE_TEXT: Record<
  RecommendationType,
  { title: string; description: string }
> = {
  SUFFICIENT: {
    title: "지금 계획으로 충분해요",
    description: "추가 저축이나 소득 없이도 목표 연령까지 자산을 유지할 수 있어요.",
  },
  SAVING_ONLY: {
    title: "저축을 통한 노후 준비",
    description:
      "매월 일정 금액을 추가로 저축하면 목표 연령까지 자산을 안정적으로 유지할 수 있어요.",
  },
  SAVING_AND_INCOME: {
    title: "저축과 추가 소득을 통한 노후 준비",
    description:
      "저축과 추가 소득을 함께 마련하면 목표 연령까지 자산을 안정적으로 유지할 수 있어요.",
  },
};

// 준비 상태별 설명 문구
export const STATUS_TEXT: Record<ReadinessStatus, string> = {
  SUFFICIENT: "현재 계획만으로도\n목표 연령까지 자산을 유지할 수 있습니다.",
  MIDDLE: "목표 연령 이전 자산이 부족해질\n가능성이 있습니다.",
  INSUFFICIENT: "목표 연령 이전 자산이 고갈될\n가능성이 높습니다.",
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

// 생활비 조정이 필요 없을 때 문구
export const EXPENSE_ENOUGH_TEXT = "생활비를 충분히 아끼고 있어\n추가 조정이 필요하지 않습니다.";
export const EXPENSE_PROPER_TEXT = "현재 생활비는 적정 수준이라\n추가 조정이 필요하지 않습니다.";
