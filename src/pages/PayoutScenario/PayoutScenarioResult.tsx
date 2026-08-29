import PageHeader from "@/components/common/header/PageHeader";
import AssetFlowChart from "@/components/PayoutScenario/AssetFlowChart";
import RecommendCard from "@/components/PayoutScenario/RecommendCard";
import ScenarioTable from "@/components/PayoutScenario/ScenarioTable";
import {
  MOCK_ASSET_FLOW,
  MOCK_PAYOUT_SCENARIOS,
  MOCK_RECOMMENDED_METHOD,
} from "@/mocks/payoutScenario";
import { usePayoutScenarioStore } from "@/stores/payoutScenarioStore";

export default function PayoutScenarioResult() {
  const earlyYears = usePayoutScenarioStore((state) => state.earlyYears);

  const recommended = MOCK_PAYOUT_SCENARIOS.find(
    (scenario) => scenario.method === MOCK_RECOMMENDED_METHOD,
  );

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-10">
        <PageHeader title="수령방식별 시나리오 결과확인" />

        {recommended && (
          <div className="mt-8">
            <RecommendCard
              method={recommended.method}
              label={recommended.recommendLabel}
              depletionAge={recommended.depletionAge}
            />
          </div>
        )}

        <div className="mt-8">
          <ScenarioTable scenarios={MOCK_PAYOUT_SCENARIOS} />
        </div>

        <h2 className="mt-10 text-base font-bold text-white">자산 흐름 비교</h2>

        <div className="mt-4">
          <AssetFlowChart data={MOCK_ASSET_FLOW} earlyYears={earlyYears} />
        </div>
      </div>
    </div>
  );
}
