import { create } from "zustand";

interface PayoutScenarioState {
  // 조기수령 연수
  earlyYears: number;
  setEarlyYears: (earlyYears: number) => void;
}

// 수령방식 시나리오 선택값 전역 상태
export const usePayoutScenarioStore = create<PayoutScenarioState>((set) => ({
  earlyYears: 5,
  setEarlyYears: (earlyYears) => set({ earlyYears }),
}));
