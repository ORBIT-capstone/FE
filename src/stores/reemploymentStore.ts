import { create } from "zustand";
import type { ReductionResponse } from "@/types/reemployment";

interface ReemploymentState {
  result: ReductionResponse | null;
  setReemployment: (result: ReductionResponse) => void;
  clearReemployment: () => void;
}

// 입력 → 감액 결과로 이어지는 전역 상태
export const useReemploymentStore = create<ReemploymentState>((set) => ({
  result: null,
  setReemployment: (result) => set({ result }),
  clearReemployment: () => set({ result: null }),
}));
