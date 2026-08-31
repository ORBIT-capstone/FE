import { create } from "zustand";
import { MOCK_PRIVATE_INFO } from "@/mocks/profile";

export interface PrivateInfo {
  // 보유 자산
  assets: string;
  // 월 지출액
  monthlyExpense: string;
  // 세전 월 소득, 입력칸은 추후 추가 예정
  monthlyIncome: string;
  // 현재까지 근속연수
  serviceYears: string;
}

interface ProfileState {
  privateInfo: PrivateInfo;
  setPrivateInfo: (privateInfo: PrivateInfo) => void;
}

// 개인정보 전역 상태, 연동 API 추가 전까지 유지
export const useProfileStore = create<ProfileState>((set) => ({
  // 화면 확인용 임시 주입, API 연동 시 빈 값으로 변경
  privateInfo: MOCK_PRIVATE_INFO,
  setPrivateInfo: (privateInfo) => set({ privateInfo }),
}));
