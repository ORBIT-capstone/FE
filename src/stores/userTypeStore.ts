import { create } from "zustand";

export type UserType = "employed" | "retired";

interface UserTypeState {
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

// 재직자·퇴직자 구분 전역 상태
export const useUserTypeStore = create<UserTypeState>((set) => ({
  userType: "employed",
  setUserType: (userType) => set({ userType }),
}));
