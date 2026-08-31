import { Navigate, useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/header/PageHeader";
import AssetFlowChart from "@/components/PayoutScenario/AssetFlowChart";
import RecommendCard from "@/components/PayoutScenario/RecommendCard";
import ScenarioTable from "@/components/PayoutScenario/ScenarioTable";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { usePayoutScenarioStore } from "@/stores/payoutScenarioStore";
import {
  RECOMMEND_LABEL,
  SCENARIO_METHOD,
  toAssetFlow,
  toScenarioRows,
} from "@/utils/payoutScenario";

export default function PayoutScenarioResult() {
  const navigate = useNavigate();
  const earlyYears = usePayoutScenarioStore((state) => state.earlyYears);
  const result = usePayoutScenarioStore((state) => state.result);
  const savePlan = useMyPlanStore((state) => state.savePlan);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/payout-scenario" replace />;

  const rows = toScenarioRows(result);
  const recommendedMethod = SCENARIO_METHOD[result.best_scenario];
  const recommended = rows.find((row) => row.method === recommendedMethod);

  // 마이플랜 내역 저장 후 홈 복귀 처리, 추후 API 저장 연결 지점
  const handleSave = () => {
    savePlan("payoutScenario");
    navigate("/");
  };

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-10">
        <PageHeader title="수령방식별 시나리오 결과확인" />

        {recommended && (
          <div className="mt-8">
            <RecommendCard
              method={recommended.method}
              label={RECOMMEND_LABEL[recommended.method]}
              depletionAge={recommended.depletionAge}
            />
          </div>
        )}

        <div className="mt-8">
          <ScenarioTable scenarios={rows} />
        </div>

        <h2 className="mt-10 text-base font-bold text-white">자산 흐름 비교</h2>

        <div className="mt-4">
          <AssetFlowChart data={toAssetFlow(result)} earlyYears={earlyYears} />
        </div>

        <Button onClick={handleSave} className="mt-10">
          저장하기
        </Button>
      </div>
    </div>
  );
}
