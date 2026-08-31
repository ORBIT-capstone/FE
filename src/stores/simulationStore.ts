import { create } from "zustand";
import type { EmployeeSimulateResponse, SimulationInput } from "@/types/simulation";

interface SimulationState {
  input: SimulationInput | null;
  result: EmployeeSimulateResponse | null;
  setSimulation: (input: SimulationInput, result: EmployeeSimulateResponse) => void;
  clearSimulation: () => void;
}

// 입력 → 결과 → 상세로 이어지는 전역 상태
export const useSimulationStore = create<SimulationState>((set) => ({
  input: null,
  result: null,
  setSimulation: (input, result) => set({ input, result }),
  clearSimulation: () => set({ input: null, result: null }),
}));
