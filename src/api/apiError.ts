import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/auth";

// FastAPI 검증 실패 응답
interface FastApiErrorResponse {
  detail: string | { loc: (string | number)[]; msg: string; type: string }[];
}

// 공통 에러 응답 추출
export const getApiError = (error: unknown): ApiErrorResponse | null => {
  if (!isAxiosError<ApiErrorResponse>(error)) return null;

  const data = error.response?.data;

  return data && typeof data.message === "string" ? data : null;
};

// FastAPI 검증 실패 문구 추출
const getFastApiErrorMessage = (error: unknown) => {
  if (!isAxiosError<FastApiErrorResponse>(error)) return "";

  const detail = error.response?.data?.detail;
  if (!detail) return "";
  if (typeof detail === "string") return detail;

  return detail.map((item) => `${item.loc.at(-1)} : ${item.msg}`).join("\n");
};

// 화면 노출용 에러 문구, 상세 사유 우선
export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const apiError = getApiError(error);

  if (apiError) {
    const detailMessage = apiError.details
      ?.map((detail) => `${detail.field} : ${detail.reason}`)
      .join("\n");

    return detailMessage || apiError.message || fallback;
  }

  return getFastApiErrorMessage(error) || fallback;
};
