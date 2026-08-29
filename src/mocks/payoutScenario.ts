export type PayoutMethod = "normal" | "early" | "lump" | "split";

export interface PayoutScenario {
  method: PayoutMethod;
  label: string;
  // 추천 배너 표기용 이름
  recommendLabel: string;
  // 월 수령액 표기, 일시금은 미표시
  monthlyAmount: string;
  // 총 수령액, 만원 단위
  totalAmount: number;
  // 자산 고갈 예상 나이
  depletionAge: number;
  isOptimal: boolean;
}

export interface AssetFlowPoint {
  age: number;
  normal: number;
  early: number;
  lump: number;
  split: number;
}

// 수령방식별 대표 색상
export const PAYOUT_COLOR: Record<PayoutMethod, string> = {
  normal: "#de8c98",
  early: "#8aaff7",
  lump: "#fdd58c",
  split: "#8ad5b6",
};

// 화면 확인용 더미 결과, API 연동 시 응답으로 대체
export const MOCK_PAYOUT_SCENARIOS: PayoutScenario[] = [
  {
    method: "normal",
    label: "정상수령",
    recommendLabel: "정상 수령",
    monthlyAmount: "142만원",
    totalAmount: 73800,
    depletionAge: 73,
    isOptimal: false,
  },
  {
    method: "early",
    label: "조기수령",
    recommendLabel: "조기 수령",
    monthlyAmount: "99만원\n(-30%)",
    totalAmount: 73800,
    depletionAge: 78,
    isOptimal: false,
  },
  {
    method: "lump",
    label: "일시금",
    recommendLabel: "일시금 수령",
    monthlyAmount: "-",
    totalAmount: 8531,
    depletionAge: 75,
    isOptimal: true,
  },
  {
    method: "split",
    label: "분할수령",
    recommendLabel: "분할 수령",
    monthlyAmount: "일시금 절반 +\n월 71만원",
    totalAmount: 29918,
    depletionAge: 76,
    isOptimal: false,
  },
];

// 추천 수령 방식
export const MOCK_RECOMMENDED_METHOD: PayoutMethod = "normal";

export const MOCK_ASSET_FLOW: AssetFlowPoint[] = [
  { age: 60, normal: 10800, early: 10800, lump: 10800, split: 10800 },
  { age: 62, normal: 10200, early: 10200, lump: 10200, split: 10200 },
  { age: 65, normal: 8600, early: 7900, lump: 6200, split: 7400 },
  { age: 67, normal: 7600, early: 6400, lump: 3200, split: 5600 },
  { age: 70, normal: 6100, early: 4300, lump: 1800, split: 3400 },
  { age: 75, normal: 3800, early: 2000, lump: 0, split: 1100 },
  { age: 78, normal: 3000, early: 1200, lump: 0, split: 0 },
  { age: 83, normal: 1600, early: 0, lump: 0, split: 0 },
  { age: 90, normal: 0, early: 0, lump: 0, split: 0 },
];

// 예상 월 연금 기본값, 만원 단위
export const MOCK_MONTHLY_PENSION = 250;
