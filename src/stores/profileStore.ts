import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  // 세전 월 소득, 회원 정보 API 미지원으로 로컬 보관
  monthlyIncome: string;
  setMonthlyIncome: (monthlyIncome: string) => void;
}

// 서버에 저장할 수 없는 개인정보 항목 전역 상태
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      monthlyIncome: "",
      setMonthlyIncome: (monthlyIncome) => set({ monthlyIncome }),
    }),
    { name: "orbit-profile" },
  ),
);
