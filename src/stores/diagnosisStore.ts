import { create } from "zustand";
import type { DiagnosisInput, DiagnosisResult } from "@/utils/diagnosis";

interface DiagnosisState {
  input: DiagnosisInput | null;
  result: DiagnosisResult | null;
  setDiagnosis: (input: DiagnosisInput, result: DiagnosisResult) => void;
  clearDiagnosis: () => void;
}

// 입력 → 결과로 이어지는 전역 상태
export const useDiagnosisStore = create<DiagnosisState>((set) => ({
  input: null,
  result: null,
  setDiagnosis: (input, result) => set({ input, result }),
  clearDiagnosis: () => set({ input: null, result: null }),
}));
