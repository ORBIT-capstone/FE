import { PENSION_ELIGIBLE_MONTHS, SERVICE_BASE_YEAR } from "@/mocks/simulation";
import type { EmployeeSimulateRequest, SimulationInput } from "@/types/simulation";

// 근속연수 중 2016년 이전 개월수 환산, 입력칸이 없어 근속연수 기준으로 산출
export const getServiceMonthsAsOf2016 = (serviceYears: number) => {
  const yearsSinceBase = new Date().getFullYear() - SERVICE_BASE_YEAR;

  return Math.max(serviceYears - yearsSinceBase, 0) * 12;
};

// 시뮬레이션 요청 데이터 변환 처리
export const buildSimulateRequest = (input: SimulationInput): EmployeeSimulateRequest => ({
  // 현재까지 근속연수 매핑
  current_years: Number(input.serviceYears),
  // 현재 월 소득 매핑, 원 단위
  current_income: Number(input.monthlyIncome),
  // 현재 나이 매핑
  current_age: Number(input.currentAge),
  // 퇴직 예정 나이 매핑
  retire_at_age: Number(input.retireAge),
  service_months_as_of_2016: getServiceMonthsAsOf2016(Number(input.serviceYears)),
});

// 연금 수급 대상 여부, 재직 10년 기준
export const isPensionEligible = (retireMonths: number) => retireMonths >= PENSION_ELIGIBLE_MONTHS;
