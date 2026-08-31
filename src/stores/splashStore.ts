import { create } from "zustand";

interface SplashState {
  // 앱 진입 후 플래시 노출 여부
  isSplashShown: boolean;
  markSplashShown: () => void;
}

// 새로고침 시마다 한 번만 노출하도록 저장하지 않음
export const useSplashStore = create<SplashState>((set) => ({
  isSplashShown: false,
  markSplashShown: () => set({ isSplashShown: true }),
}));
