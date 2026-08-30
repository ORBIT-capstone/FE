import { create } from "zustand";
import type { PlanType, SavedPlan } from "@/mocks/myPlan";
import { MOCK_SAVED_PLANS, PLAN_PRESET } from "@/mocks/myPlan";
import { formatDate } from "@/utils/format";

interface MyPlanState {
  plans: SavedPlan[];
  savePlan: (type: PlanType) => void;
  clearPlans: () => void;
}

// 저장된 진단 내역 전역 상태
export const useMyPlanStore = create<MyPlanState>((set) => ({
  // 화면 확인용 임시 주입, API 연동 시 빈 배열로 변경
  plans: MOCK_SAVED_PLANS,
  savePlan: (type) =>
    set((state) => ({
      plans: [
        { id: `${Date.now()}`, type, savedAt: formatDate(new Date()), ...PLAN_PRESET[type] },
        ...state.plans,
      ],
    })),
  clearPlans: () => set({ plans: [] }),
}));
