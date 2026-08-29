import { create } from "zustand";
import { MOCK_CURRENT_USER } from "@/mocks/currentUser";

export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  rememberMe: boolean;
  setAuth: (user: AuthUser, accessToken: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  clearAuth: () => void;
}

// 로그인 결과 전역 상태
export const useAuthStore = create<AuthState>((set) => ({
  // 화면 확인용 임시 주입, API 연동 시 null 로 변경
  user: MOCK_CURRENT_USER,
  accessToken: null,
  rememberMe: false,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  setRememberMe: (rememberMe) => set({ rememberMe }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
