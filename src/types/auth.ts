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

export interface UpdateMeRequest {
  name: string;
  birthDate: string;
  gender: ApiGender;
}

// 회원 정보 조회·수정 응답
export interface UserResponse {
  id: number | string;
  email: string;
  name: string;
  birthDate: string;
  gender: ApiGender;
}

// 화면에서 사용하는 회원 정보
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  gender: Gender;
}

export const toApiGender = (gender: Gender): ApiGender => (gender === "male" ? "MALE" : "FEMALE");

export const toGender = (gender: ApiGender): Gender => (gender === "MALE" ? "male" : "female");

// 응답값을 화면용 회원 정보로 변환
export const toAuthUser = (user: UserResponse): AuthUser => ({
  id: String(user.id),
  email: user.email,
  name: user.name,
  birthDate: user.birthDate,
  gender: toGender(user.gender),
});
