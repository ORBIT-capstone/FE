import { create } from "zustand";
import { MOCK_REEMPLOYMENT_INPUT } from "@/mocks/reemployment";
import type { ReemploymentInput, ReemploymentResult } from "@/utils/reemployment";
import { calculateReemployment } from "@/utils/reemployment";

interface ReemploymentState {
  input: ReemploymentInput | null;
  result: ReemploymentResult | null;
  setReemployment: (input: ReemploymentInput, result: ReemploymentResult) => void;
  clearReemployment: () => void;
}

// 입력 → 감액 결과로 이어지는 전역 상태
export const useReemploymentStore = create<ReemploymentState>((set) => ({
  // 화면 확인용 임시 주입, API 연동 시 null 로 변경
  input: MOCK_REEMPLOYMENT_INPUT,
  result: calculateReemployment(MOCK_REEMPLOYMENT_INPUT),
  setReemployment: (input, result) => set({ input, result }),
  clearReemployment: () => set({ input: null, result: null }),
}));
