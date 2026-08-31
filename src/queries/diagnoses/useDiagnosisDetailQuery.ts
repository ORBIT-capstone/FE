import { useQuery } from "@tanstack/react-query";
import { getDiagnosisDetail } from "@/api/diagnoses/diagnosesApi";
import { DIAGNOSIS_KEYS } from "@/queries/diagnoses/diagnosisKeys";
import type { DiagnosisType } from "@/types/diagnoses";

// 저장된 진단 상세 조회, id 가 없으면 요청하지 않음
export default function useDiagnosisDetailQuery<T extends DiagnosisType>(
  type: T,
  id: number | null,
) {
  return useQuery({
    queryKey: DIAGNOSIS_KEYS.detail(type, id ?? 0),
    queryFn: () => getDiagnosisDetail(type, id as number),
    enabled: id !== null,
  });
}
