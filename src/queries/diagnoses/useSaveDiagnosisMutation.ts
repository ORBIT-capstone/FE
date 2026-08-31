import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveDiagnosis } from "@/api/diagnoses/diagnosesApi";
import { DIAGNOSIS_KEYS } from "@/queries/diagnoses/diagnosisKeys";
import type { DiagnosisResultMap, DiagnosisType } from "@/types/diagnoses";

// 종류별 계산 결과 저장 요청
export default function useSaveDiagnosisMutation<T extends DiagnosisType>(type: T) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (result: DiagnosisResultMap[T]) => saveDiagnosis(type, result),
    // 저장 성공 후 마이플랜 목록 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DIAGNOSIS_KEYS.list() }),
  });
}
