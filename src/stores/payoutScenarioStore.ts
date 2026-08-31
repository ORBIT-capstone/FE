import { create } from "zustand";
import type { PayoutScenarioResponse } from "@/types/payoutScenario";

interface PayoutScenarioState {
  // 조기수령 연수
  earlyYears: number;
  result: PayoutScenarioResponse | null;
  setEarlyYears: (earlyYears: number) => void;
  setResult: (result: PayoutScenarioResponse) => void;
  clearResult: () => void;
}

// 수령방식 시나리오 선택값 전역 상태
export const usePayoutScenarioStore = create<PayoutScenarioState>((set) => ({
  earlyYears: 5,
  result: null,
  setEarlyYears: (earlyYears) => set({ earlyYears }),
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}));
