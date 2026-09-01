import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/header/PageHeader";
import Toast, { SAVE_TOAST_MESSAGE } from "@/components/common/toast/Toast";
import ResultPlaceholder from "@/components/common/result/ResultPlaceholder";
import AssetFlowChart from "@/components/PayoutScenario/AssetFlowChart";
import RecommendCard from "@/components/PayoutScenario/RecommendCard";
import ScenarioTable from "@/components/PayoutScenario/ScenarioTable";
import useDiagnosisResult from "@/hooks/useDiagnosisResult";
import useSaveDiagnosisMutation from "@/queries/diagnoses/useSaveDiagnosisMutation";
import { usePayoutScenarioStore } from "@/stores/payoutScenarioStore";
import {
  RECOMMEND_LABEL,
  SCENARIO_METHOD,
  toAssetFlow,
  toScenarioRows,
} from "@/utils/payoutScenario";

const PAGE_TITLE = "수령방식별 시나리오 결과확인";

export default function PayoutScenarioResult() {
  const navigate = useNavigate();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const earlyYears = usePayoutScenarioStore((state) => state.earlyYears);
  const calculatedResult = usePayoutScenarioStore((state) => state.result);
  const { result, isSaved, isLoading, errorMessage } = useDiagnosisResult(
    "RECEIPT_SCENARIOS",
    calculatedResult,
  );
  const {
    mutate: saveMutate,
    isPending,
    error: saveError,
  } = useSaveDiagnosisMutation("RECEIPT_SCENARIOS");

  if (isLoading) {
    return <ResultPlaceholder title={PAGE_TITLE} message="데이터를 불러오는 중입니다" isLoading />;
  }

  if (isSaved && !result) {
    return (
      <ResultPlaceholder
        title={PAGE_TITLE}
        message={errorMessage || "저장된 결과를 찾을 수 없습니다"}
      />
    );
  }

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/payout-scenario" replace />;

  const rows = toScenarioRows(result);
  const recommendedMethod = SCENARIO_METHOD[result.best_scenario];
  const recommended = rows.find((row) => row.method === recommendedMethod);

  // 시나리오 비교 결과 저장 후 홈 복귀 처리
  const handleSave = () => saveMutate(result, { onSuccess: () => setIsToastOpen(true) });

  return (
    <div className="min-h-svh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-page-safe">
        <PageHeader title={PAGE_TITLE} />

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

        {saveError && (
          <p className="mt-6 text-sm text-btn-active">
            {getApiErrorMessage(saveError, "저장에 실패했습니다")}
          </p>
        )}

        {/* 저장된 결과 조회 시에는 저장 버튼 미노출 */}
        {!isSaved && (
          <Button onClick={handleSave} disabled={isPending} className="mt-10">
            {isPending ? "저장 중..." : "저장하기"}
          </Button>
        )}
      </div>
      {isPending && <Loading variant="overlay" message="결과를 저장하는 중입니다" />}
      {isToastOpen && <Toast message={SAVE_TOAST_MESSAGE} onClose={() => navigate("/")} />}
    </div>
  );
}
