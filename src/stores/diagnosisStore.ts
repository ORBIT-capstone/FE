import { create } from "zustand";
import type { RetirementDiagnosisResponse } from "@/types/diagnosis";

interface DiagnosisState {
  result: RetirementDiagnosisResponse | null;
  setDiagnosis: (result: RetirementDiagnosisResponse) => void;
  clearDiagnosis: () => void;
}

// 입력 → 결과로 이어지는 전역 상태
export const useDiagnosisStore = create<DiagnosisState>((set) => ({
  result: null,
  setDiagnosis: (result) => set({ result }),
  clearDiagnosis: () => set({ result: null }),
}));
