import { create } from "zustand";
import type { ReductionResponse, ReemploymentInput } from "@/types/reemployment";

interface ReemploymentState {
  input: ReemploymentInput | null;
  result: ReductionResponse | null;
  setReemployment: (input: ReemploymentInput, result: ReductionResponse) => void;
  clearReemployment: () => void;
}

// 입력 → 감액 결과로 이어지는 전역 상태
export const useReemploymentStore = create<ReemploymentState>((set) => ({
  input: null,
  result: null,
  setReemployment: (input, result) => set({ input, result }),
  clearReemployment: () => set({ input: null, result: null }),
}));
