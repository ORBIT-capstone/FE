import { create } from "zustand";
import type { SimulationInput, SimulationResult } from "@/utils/simulation";

interface SimulationState {
  input: SimulationInput | null;
  result: SimulationResult | null;
  setSimulation: (input: SimulationInput, result: SimulationResult) => void;
  clearSimulation: () => void;
}

// 입력 → 결과 → 상세로 이어지는 전역 상태
export const useSimulationStore = create<SimulationState>((set) => ({
  input: null,
  result: null,
  setSimulation: (input, result) => set({ input, result }),
  clearSimulation: () => set({ input: null, result: null }),
}));
