import { PENSION_ELIGIBLE_YEARS, SIMULATION_FACTORS } from "@/mocks/simulation";

export interface SimulationInput {
  // 현재 나이
  currentAge: string;
  // 퇴직 예정 나이
  retireAge: string;
  // 현재 월 소득, 원 단위
  monthlyIncome: string;
  // 현재까지 근속연수
  serviceYears: string;
}

export interface SimulationResult {
  currentServiceYears: number;
  totalServiceYears: number;
  isPensionEligible: boolean;
  averageIncome: number;
  incomeFactor: number;
  monthlyPension: number;
  lumpSum: number;
  retirementAllowance: number;
}

// 입력값 기반 임시 계산, API 연동 시 이 함수만 교체 대상
export const calculateSimulation = (input: SimulationInput): SimulationResult => {
  const currentAge = Number(input.currentAge);
  const retireAge = Number(input.retireAge);
  const monthlyIncome = Number(input.monthlyIncome);
  const currentServiceYears = Number(input.serviceYears);

  const totalServiceYears = currentServiceYears + (retireAge - currentAge);
  const isPensionEligible = totalServiceYears >= PENSION_ELIGIBLE_YEARS;
  const averageIncome = monthlyIncome * SIMULATION_FACTORS.income;

  return {
    currentServiceYears,
    totalServiceYears,
    isPensionEligible,
    averageIncome,
    incomeFactor: SIMULATION_FACTORS.income,
    monthlyPension: isPensionEligible
      ? averageIncome * SIMULATION_FACTORS.pensionRate * totalServiceYears
      : 0,
    lumpSum: isPensionEligible
      ? 0
      : averageIncome * SIMULATION_FACTORS.lumpSumRate * totalServiceYears,
    retirementAllowance: isPensionEligible
      ? 0
      : averageIncome * SIMULATION_FACTORS.allowanceRate * totalServiceYears,
  };
};
