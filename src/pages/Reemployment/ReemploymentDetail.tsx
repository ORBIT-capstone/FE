import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import FixedBottomBar from "@/components/common/button/FixedBottomBar";
import PageHeader from "@/components/common/header/PageHeader";
import Toast, { SAVE_TOAST_MESSAGE } from "@/components/common/toast/Toast";
import AgeDetailTable from "@/components/common/result/AgeDetailTable";
import AssetChangeChart from "@/components/common/result/AssetChangeChart";
import ResultPlaceholder from "@/components/common/result/ResultPlaceholder";
import SummaryCard from "@/components/common/result/SummaryCard";
import type { SummaryChip } from "@/components/common/result/SummaryCard";
import useDiagnosisResult from "@/hooks/useDiagnosisResult";
import { STATUS_TEXT } from "@/mocks/reemployment";
import useSaveDiagnosisMutation from "@/queries/diagnoses/useSaveDiagnosisMutation";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import { findCrossAge } from "@/utils/diagnosis";
import { formatManCheonWon, formatNumber } from "@/utils/format";
import { getScore, toAgeDetailRows, toAssetFlow } from "@/utils/reemployment";

const PAGE_TITLE = "재취업 연금 감액 계산결과";

export default function ReemploymentDetail() {
  const navigate = useNavigate();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const calculatedResult = useReemploymentStore((state) => state.result);
  const { result, isSaved, isLoading, errorMessage } = useDiagnosisResult(
    "PENSION_REDUCTION",
    calculatedResult,
  );
  const {
    mutate: saveMutate,
    isPending,
    error: saveError,
  } = useSaveDiagnosisMutation("PENSION_REDUCTION");

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
  if (!result) return <Navigate to="/reemployment" replace />;

  const score = getScore(result);
  const statusText = STATUS_TEXT[result.status];
  const assetFlow = toAssetFlow(result);

  const chips: SummaryChip[] = [
    {
      label: "월 연금 감액액",
      value: `${formatNumber(result.monthly_reduction)}원`,
      isEmphasis: true,
    },
    {
      label: "전액 지급 소득 기준",
      value: formatManCheonWon(result.full_payment_income_threshold),
      isEmphasis: true,
    },
    {
      label: "예상 자산 고갈 나이",
      value: result.depletion_age === null ? "해당없음" : `${result.depletion_age}세`,
    },
    { label: "진단 상태", value: result.status, isEmphasis: true },
  ];

  // 감액 계산 결과 저장 후 홈 복귀 처리
  const handleSave = () => saveMutate(result, { onSuccess: () => setIsToastOpen(true) });

  return (
    <div className="flex min-h-svh w-full flex-col bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 flex-1 px-7 pb-8">
        <PageHeader title={PAGE_TITLE} />

        <div className="mt-8 flex flex-col gap-6">
          <SummaryCard
            score={score}
            statusLabel={statusText.label}
            headline={statusText.headline}
            description={statusText.description}
            chips={chips}
            tone={statusText.tone}
          />

          <AssetChangeChart data={assetFlow} crossAge={findCrossAge(assetFlow)} tone="mint" />

          <AgeDetailTable rows={toAgeDetailRows(result)} tone="mint" />
        </div>

        {saveError && (
          <p className="mt-6 text-sm text-btn-active">
            {getApiErrorMessage(saveError, "저장에 실패했습니다")}
          </p>
        )}
      </div>

      <FixedBottomBar>
        {/* 저장된 결과 조회 시에는 저장 버튼 미노출 */}
        {!isSaved && (
          <Button tone="mint" onClick={handleSave} disabled={isPending}>
            {isPending ? "저장 중..." : "재취업 연금 감액 분석 저장하기"}
          </Button>
        )}

        <Button tone="yellow" onClick={() => navigate("/retirement-plan")}>
          맞춤 노후 설계가기
        </Button>
      </FixedBottomBar>
      {isPending && <Loading variant="overlay" message="결과를 저장하는 중입니다" />}
      {isToastOpen && <Toast message={SAVE_TOAST_MESSAGE} onClose={() => navigate("/")} />}
    </div>
  );
}
