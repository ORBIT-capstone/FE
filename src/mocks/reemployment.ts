import type { ReadinessStatus } from "@/types/diagnosis";
import type { ResultTone } from "@/utils/resultTone";

// 상태별 문구와 강조 색상
export const STATUS_TEXT: Record<
  ReadinessStatus,
  { label: string; headline: string; description: string; tone: ResultTone }
> = {
  SUFFICIENT: {
    label: "충분",
    headline: "충분 단계입니다",
    description:
      "현재 자산과 소득으로\n목표 은퇴 시점까지 안정적인\n생활이 가능할 것으로 예상됩니다",
    tone: "mint",
  },
  MIDDLE: {
    label: "중간",
    headline: "중간 단계입니다",
    description:
      "감액된 연금과 현재 자산으로\n생활은 가능하지만\n여유가 크지 않을 것으로 예상됩니다",
    tone: "yellow",
  },
  INSUFFICIENT: {
    label: "부족",
    headline: "부족 단계입니다",
    description:
      "감액된 연금과 현재 자산으로는\n목표 은퇴 시점까지 생활을\n유지하기 어려울 것으로 예상됩니다",
    tone: "pink",
  },
};
