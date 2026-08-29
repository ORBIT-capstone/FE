import { create } from "zustand";
import { MOCK_PRIVATE_INFO, MOCK_PROFILE } from "@/mocks/profile";

export type Gender = "male" | "female";

export interface Profile {
  name: string;
  birthDate: string;
  gender: Gender;
  email: string;
}

export interface PrivateInfo {
  // 보유 자산
  assets: string;
  // 월 지출액
  monthlyExpense: string;
  // 현재까지 근속연수
  serviceYears: string;
}

interface ProfileState {
  profile: Profile;
  privateInfo: PrivateInfo;
  setProfile: (profile: Profile) => void;
  setPrivateInfo: (privateInfo: PrivateInfo) => void;
}

// 프로필·개인정보 전역 상태
export const useProfileStore = create<ProfileState>((set) => ({
  // 화면 확인용 임시 주입, API 연동 시 빈 값으로 변경
  profile: MOCK_PROFILE,
  privateInfo: MOCK_PRIVATE_INFO,
  setProfile: (profile) => set({ profile }),
  setPrivateInfo: (privateInfo) => set({ privateInfo }),
}));
