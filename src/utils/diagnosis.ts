import { DETAIL_AGE_STEP, SUFFICIENT_SCORE } from "@/mocks/diagnosis";
import type {
  AgeDetailRow,
  AssetFlowPoint,
  DiagnosisInput,
  RetirementDiagnosisRequest,
  RetirementDiagnosisResponse,
} from "@/types/diagnosis";

const MAN_WON = 10_000;

// 원 단위 응답을 만원 단위 표기값으로 변환
const toManWon = (amount: number) => Math.round(amount / MAN_WON);

// 진단 요청 데이터 변환 처리
export const buildDiagnosisRequest = (input: DiagnosisInput): RetirementDiagnosisRequest => ({
  // 현재 나이 매핑
  current_age: Number(input.currentAge),
  // 월 생활비 매핑, 원 단위
  monthly_expenses: Number(input.monthlyExpense),
  // 월 연금 수령액 매핑, 원 단위
  monthly_pension: Number(input.monthlyPension),
  // 보유 자산 매핑, 원 단위
  asset: Number(input.assets),
  gender: input.gender,
});

// 자산이 버티는 기간 비율 기반 점수, 응답에 없어 프론트에서 산출
export const getDiagnosisScore = (result: RetirementDiagnosisResponse) => {
  const survivedYears = (result.depletion_age ?? result.target_age) - result.current_age;
  const targetYears = Math.max(result.target_age - result.current_age, 1);

  return Math.min(Math.round((survivedYears / targetYears) * 100), 100);
};

// 점수 기준 충분 여부, 상태 문구 분기용
export const isSufficientScore = (score: number) => score >= SUFFICIENT_SCORE;

// 기대수명 이후 구간 제외
const getTimeline = (result: RetirementDiagnosisResponse) =>
  result.timeline.filter((point) => point.age <= result.target_age);

// 자산 변화 그래프용 변환
export const toAssetFlow = (result: RetirementDiagnosisResponse): AssetFlowPoint[] =>
  getTimeline(result).map((point) => ({
    age: point.age,
    asset: toManWon(point.asset),
    cumulative: toManWon(point.cumulative_annual_gap),
  }));

// 연령별 상세 내역용 변환, 10년 단위 추출
export const toAgeDetailRows = (result: RetirementDiagnosisResponse): AgeDetailRow[] =>
  getTimeline(result)
    .filter((point) => (point.age - result.current_age) % DETAIL_AGE_STEP === 0)
    .map((point) => ({
      age: point.age,
      annualIncome: toManWon(point.annual_income),
      annualExpense: toManWon(point.annual_expense),
      annualShortage: toManWon(point.annual_gap),
      cumulativeShortage: toManWon(point.cumulative_annual_gap),
      asset: toManWon(point.asset),
    }));

// 자산과 누적 부족액이 교차하는 나이
export const findCrossAge = (assetFlow: AssetFlowPoint[]) => {
  const crossPoint = assetFlow.find((point) => point.cumulative >= point.asset);

  return crossPoint?.age ?? null;
};
