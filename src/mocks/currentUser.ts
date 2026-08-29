import type { AuthUser } from "@/stores/authStore";

// 화면 확인용 임시 로그인 사용자, API 연동 시 제거 대상
export const MOCK_CURRENT_USER: AuthUser = {
  id: "1",
  email: "seohu@orbit.com",
  nickname: "서후",
};
