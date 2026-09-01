import { create } from "zustand";
import type { EmployeeSimulateResponse } from "@/types/simulation";

interface SimulationState {
  result: EmployeeSimulateResponse | null;
  setSimulation: (result: EmployeeSimulateResponse) => void;
  clearSimulation: () => void;
}

// 입력 → 결과 → 상세로 이어지는 전역 상태
export const useSimulationStore = create<SimulationState>((set) => ({
  result: null,
  setSimulation: (result) => set({ result }),
  clearSimulation: () => set({ result: null }),
}));
