import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/auth";

// 회원 없음으로 분류할 에러 코드, 실제 코드값 확인 시 이 목록만 교체
const NOT_FOUND_ERROR_CODES = ["USER_NOT_FOUND", "MEMBER_NOT_FOUND", "NOT_FOUND"];

export type LoginErrorType = "invalid" | "notFound";

// 공통 에러 응답 추출
export const getApiError = (error: unknown): ApiErrorResponse | null => {
  if (!isAxiosError<ApiErrorResponse>(error)) return null;

  return error.response?.data ?? null;
};

// 화면 노출용 에러 문구, 상세 사유 우선
export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const apiError = getApiError(error);
  if (!apiError) return fallback;

  const detailMessage = apiError.details
    ?.map((detail) => `${detail.field} : ${detail.reason}`)
    .join("\n");

  return detailMessage || apiError.message || fallback;
};

// 로그인 실패 유형 분기
export const getLoginErrorType = (error: unknown): LoginErrorType => {
  const status = isAxiosError(error) ? error.response?.status : undefined;
  const code = getApiError(error)?.code ?? "";

  if (status === 404 || NOT_FOUND_ERROR_CODES.some((item) => code.includes(item))) {
    return "notFound";
  }

  return "invalid";
};
