import { create } from "zustand";
import { MOCK_DIAGNOSIS_INPUT } from "@/mocks/diagnosis";
import type { DiagnosisInput, DiagnosisResult } from "@/utils/diagnosis";
import { calculateDiagnosis } from "@/utils/diagnosis";

interface DiagnosisState {
  input: DiagnosisInput | null;
  result: DiagnosisResult | null;
  setDiagnosis: (input: DiagnosisInput, result: DiagnosisResult) => void;
  clearDiagnosis: () => void;
}

// 입력 → 결과로 이어지는 전역 상태
export const useDiagnosisStore = create<DiagnosisState>((set) => ({
  // 화면 확인용 임시 주입, API 연동 시 null 로 변경
  input: MOCK_DIAGNOSIS_INPUT,
  result: calculateDiagnosis(MOCK_DIAGNOSIS_INPUT),
  setDiagnosis: (input, result) => set({ input, result }),
  clearDiagnosis: () => set({ input: null, result: null }),
}));
