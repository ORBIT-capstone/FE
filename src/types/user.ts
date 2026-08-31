import type { ApiGender, Gender } from "@/types/auth";
import { toGender } from "@/types/auth";

// 회원 정보 수정 요청, 생략한 값은 기존 값 유지
export interface UpdateUserRequest {
  name?: string;
  birthDate?: string;
  gender?: ApiGender;
  // 보유 자산, 원 단위
  asset?: number;
  // 월 지출액, 원 단위
  monthlyExpenses?: number;
  // 현재 근속연수, 년 단위
  currentYears?: number;
  // 월 연금 수령액, 원 단위
  monthlyPension?: number;
}

// 회원 정보 조회·수정 응답, 개인정보 항목은 미등록 시 없을 수 있음
export interface UserResponse {
  id: number | string;
  email: string;
  name: string;
  birthDate: string;
  gender: ApiGender;
  asset?: number | null;
  monthlyExpenses?: number | null;
  currentYears?: number | null;
  monthlyPension?: number | null;
}

// 화면에서 사용하는 회원 정보
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  gender: Gender;
}

// 응답값을 화면용 회원 정보로 변환
export const toAuthUser = (user: UserResponse): AuthUser => ({
  id: String(user.id),
  email: user.email,
  name: user.name,
  birthDate: user.birthDate,
  gender: toGender(user.gender),
});
