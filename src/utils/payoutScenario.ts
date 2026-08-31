import type {
  AssetFlowPoint,
  PayoutMethod,
  PayoutScenarioResponse,
  PayoutScenarioRow,
  ScenarioOutcome,
  ScenarioType,
} from "@/types/payoutScenario";

const MAN_WON = 10_000;

// 응답 수령방식과 화면 키 매핑
export const SCENARIO_METHOD: Record<ScenarioType, PayoutMethod> = {
  NORMAL: "normal",
  EARLY: "early",
  LUMP_SUM: "lump",
  INSTALLMENT: "split",
};

const METHOD_LABEL: Record<PayoutMethod, string> = {
  normal: "정상수령",
  early: "조기수령",
  lump: "일시금",
  split: "분할수령",
};

// 추천 배너 표기용 이름
export const RECOMMEND_LABEL: Record<PayoutMethod, string> = {
  normal: "정상 수령",
  early: "조기 수령",
  lump: "일시금 수령",
  split: "분할 수령",
};

const toManWon = (amount: number) => Math.round(amount / MAN_WON);

// 첫 해 소득 기준 월 수령액, 만원 단위
const getMonthlyAmount = (scenario: ScenarioOutcome) =>
  toManWon((scenario.timeline[0]?.annual_income ?? 0) / 12);

// 수령방식별 월 수령액 표기
const toMonthlyAmountText = (scenario: ScenarioOutcome, normalAmount: number) => {
  const amount = getMonthlyAmount(scenario);

  if (scenario.scenario_type === "LUMP_SUM") return "-";
  if (scenario.scenario_type === "INSTALLMENT") return `일시금 절반 +\n월 ${amount}만원`;

  // 정상수령 대비 감액률 표기
  if (scenario.scenario_type === "EARLY" && normalAmount > 0) {
    const rate = Math.round((amount / normalAmount - 1) * 100);

    return `${amount}만원\n(${rate}%)`;
  }

  return `${amount}만원`;
};

// 비교 표 데이터 변환
export const toScenarioRows = (result: PayoutScenarioResponse): PayoutScenarioRow[] => {
  const normalScenario = result.scenarios.find((item) => item.scenario_type === "NORMAL");
  const normalAmount = normalScenario ? getMonthlyAmount(normalScenario) : 0;

  return result.scenarios.map((scenario) => {
    const method = SCENARIO_METHOD[scenario.scenario_type];

    return {
      method,
      label: METHOD_LABEL[method],
      monthlyAmount: toMonthlyAmountText(scenario, normalAmount),
      totalAmount: toManWon(scenario.total_received),
      depletionAge: scenario.depletion_age,
      breakEvenAge: scenario.break_even_age,
      isOptimal: scenario.scenario_type === result.best_scenario,
    };
  });
};

// 자산 흐름 그래프용 변환, 나이 기준으로 4개 시나리오 병합
export const toAssetFlow = (result: PayoutScenarioResponse): AssetFlowPoint[] => {
  const pointMap = new Map<number, AssetFlowPoint>();

  result.scenarios.forEach((scenario) => {
    const method = SCENARIO_METHOD[scenario.scenario_type];

    scenario.timeline.forEach((point) => {
      const merged = pointMap.get(point.age) ?? {
        age: point.age,
        normal: 0,
        early: 0,
        lump: 0,
        split: 0,
      };

      merged[method] = toManWon(point.asset);
      pointMap.set(point.age, merged);
    });
  });

  return [...pointMap.values()].sort((a, b) => a.age - b.age);
};
