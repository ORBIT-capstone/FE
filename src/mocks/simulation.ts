// 연금 수급 기준 재직연수
export const PENSION_ELIGIBLE_YEARS = 10;

// 계산용 임시 계수, API 연동 시 응답값으로 대체
export const SIMULATION_FACTORS = {
  income: 0.989,
  pensionRate: 0.017,
  lumpSumRate: 1.2,
  allowanceRate: 0.1,
};

// 화면 확인용 임시 입력값, API 연동 시 제거 대상
export const MOCK_SIMULATION_INPUT = {
  currentAge: "45",
  retireAge: "62",
  monthlyIncome: "3800000",
  serviceYears: "8",
};
