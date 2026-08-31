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

// 목록이 배열·래핑 형태로 모두 올 수 있어 배열로 정규화
const toSummaryList = (data: unknown): DiagnosisSummary[] => {
  if (Array.isArray(data)) return data as DiagnosisSummary[];
  if (!data || typeof data !== "object") return [];

  const wrapped = Object.values(data as Record<string, unknown>).find(Array.isArray);

  return (wrapped as DiagnosisSummary[]) ?? [];
};

// 상세가 result 래핑 없이 결과 원본만 올 수 있어 상세 형태로 정규화
const toDetail = <T extends DiagnosisType>(
  type: T,
  id: number,
  data: unknown,
): DiagnosisDetail<T> => {
  const body = (data ?? {}) as Record<string, unknown>;

  if ("result" in body) return body as unknown as DiagnosisDetail<T>;

  return {
    id,
    diagnosisType: type,
    status: null,
    depletionAge: null,
    createdAt: "",
    result: body as unknown as DiagnosisResultMap[T],
  };
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
  const { data } = await axiosInstance.get("/api/diagnoses");

  return toSummaryList(data);
};

// 종류별 결과 상세 조회
export const getDiagnosisDetail = async <T extends DiagnosisType>(type: T, id: number) => {
  const { data } = await axiosInstance.get(`${DIAGNOSIS_PATH[type]}/${id}`);

  return toDetail(type, id, data);
};
