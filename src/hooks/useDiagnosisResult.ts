import { useParams } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import useDiagnosisDetailQuery from "@/queries/diagnoses/useDiagnosisDetailQuery";
import type { DiagnosisResultMap, DiagnosisType } from "@/types/diagnoses";

// 마이플랜 진입이면 저장된 결과, 아니면 방금 계산한 결과 사용
export default function useDiagnosisResult<T extends DiagnosisType>(
  type: T,
  calculatedResult: DiagnosisResultMap[T] | null,
) {
  const { id } = useParams();
  const savedId = Number(id);
  const isSaved = id !== undefined && Number.isFinite(savedId);

  const { data, isLoading, error } = useDiagnosisDetailQuery(type, isSaved ? savedId : null);

  return {
    result: isSaved ? (data?.result ?? null) : calculatedResult,
    isSaved,
    isLoading,
    errorMessage: error ? getApiErrorMessage(error, "저장된 결과를 불러오지 못했습니다") : "",
  };
}
