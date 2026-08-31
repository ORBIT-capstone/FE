import type { PayoutMethod } from "@/types/payoutScenario";

// 수령방식별 대표 색상
export const PAYOUT_COLOR: Record<PayoutMethod, string> = {
  normal: "#de8c98",
  early: "#8aaff7",
  lump: "#fdd58c",
  split: "#8ad5b6",
};
