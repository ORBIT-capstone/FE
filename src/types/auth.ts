export type Gender = "male" | "female";
export type ApiGender = "MALE" | "FEMALE";

// 공통 에러 응답
export interface ApiErrorDetail {
  field: string;
  reason: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
  timestamp: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: ApiGender;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// 토큰 재발급 요청
export interface RefreshTokenRequest {
  refreshToken: string;
}

export const toApiGender = (gender: Gender): ApiGender => (gender === "male" ? "MALE" : "FEMALE");

export const toGender = (gender: ApiGender): Gender => (gender === "MALE" ? "male" : "female");
