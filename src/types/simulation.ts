// 입력 화면 값, 모두 문자열 보관
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

export interface EmployeeSimulateRequest {
  current_years: number;
  current_income: number;
  current_age: number;
  retire_at_age: number;
  service_months_as_of_2016: number;
}

export interface EmployeeSimulateResponse {
  retire_months: number;
  current_band: string;
  retire_band: string;
  income_factor: number;
  estimated_avg_income: number;
  monthly_pension: number;
  lump_sum: number;
  severance_pay: number;
  service_cap_years: number;
  cap_basis: string;
}
