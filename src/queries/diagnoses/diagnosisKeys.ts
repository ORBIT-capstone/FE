import type { DiagnosisType } from "@/types/diagnoses";

// 진단 저장·조회 캐시 키
export const DIAGNOSIS_KEYS = {
  all: ["diagnoses"] as const,
  list: () => [...DIAGNOSIS_KEYS.all, "list"] as const,
  detail: (type: DiagnosisType, id: number) => [...DIAGNOSIS_KEYS.all, type, id] as const,
};
