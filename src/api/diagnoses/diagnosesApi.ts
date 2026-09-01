import { axiosInstance } from "@/api/axiosInstance";
import type {
  DiagnosisDetail,
  DiagnosisResultMap,
  DiagnosisSummary,
  DiagnosisType,
} from "@/types/diagnoses";

// 종류별 저장·조회 경로
const DIAGNOSIS_PATH: Record<DiagnosisType, string> = {
  EMPLOYEE_PENSION: "/api/diagnoses/employees/simulate",
  RECEIPT_SCENARIOS: "/api/diagnoses/employees/scenarios",
  RETIREMENT_ASSET: "/api/diagnoses/retirement/diagnosis",
  PENSION_REDUCTION: "/api/diagnoses/retirement/reduction",
  RETIREMENT_RECOMMENDATION: "/api/diagnoses/retirement/recommendations",
};

// 계산 결과 저장, 계산 API 응답 원본을 그대로 전달
export const saveDiagnosis = async <T extends DiagnosisType>(
  type: T,
  result: DiagnosisResultMap[T],
) => {
  const { data } = await axiosInstance.post<DiagnosisDetail<T>>(DIAGNOSIS_PATH[type], result);

  return data;
};

export const getDiagnoses = async () => {
  const { data } = await axiosInstance.get<DiagnosisSummary[]>("/api/diagnoses");

  return data;
};

// 종류별 결과 상세 조회
export const getDiagnosisDetail = async <T extends DiagnosisType>(type: T, id: number) => {
  const { data } = await axiosInstance.get<DiagnosisDetail<T>>(`${DIAGNOSIS_PATH[type]}/${id}`);

  return data;
};
