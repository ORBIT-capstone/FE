import { Navigate, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/header/PageHeader";
import AgeDetailTable from "@/components/common/result/AgeDetailTable";
import AssetChangeChart from "@/components/common/result/AssetChangeChart";
import ResultPlaceholder from "@/components/common/result/ResultPlaceholder";
import SummaryCard from "@/components/common/result/SummaryCard";
import type { SummaryChip } from "@/components/common/result/SummaryCard";
import useDiagnosisResult from "@/hooks/useDiagnosisResult";
import useSaveDiagnosisMutation from "@/queries/diagnoses/useSaveDiagnosisMutation";
import { useDiagnosisStore } from "@/stores/diagnosisStore";
import type { ReadinessStatus } from "@/types/diagnosis";
import { findCrossAge, getDiagnosisScore, toAgeDetailRows, toAssetFlow } from "@/utils/diagnosis";
import { formatWon } from "@/utils/format";

const PAGE_TITLE = "은퇴 자산 진단 결과";

// 진단 상태별 문구
const STATUS_TEXT: Record<
  ReadinessStatus,
  { label: string; headline: string; description: string }
> = {
  SUFFICIENT: {
    label: "충분",
    headline: "충분 단계입니다",
    description:
      "현재 자산과 소득으로\n목표 은퇴 시점까지 안정적인\n생활이 가능할 것으로 예상됩니다",
  },
  MIDDLE: {
    label: "중간",
    headline: "중간 단계입니다",
    description: "현재 자산과 소득으로\n생활은 가능하지만\n여유가 크지 않을 것으로 예상됩니다",
  },
  INSUFFICIENT: {
    label: "부족",
    headline: "부족 단계입니다",
    description:
      "현재 자산과 소득으로는\n목표 은퇴 시점까지 생활을\n유지하기 어려울 것으로 예상됩니다",
  },
};

export default function DiagnosisResult() {
  const navigate = useNavigate();
  const calculatedResult = useDiagnosisStore((state) => state.result);
  const { result, isSaved, isLoading, errorMessage } = useDiagnosisResult(
    "RETIREMENT_ASSET",
    calculatedResult,
  );
  const {
    mutate: saveMutate,
    isPending,
    error: saveError,
  } = useSaveDiagnosisMutation("RETIREMENT_ASSET");

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
  if (!result) return <Navigate to="/diagnosis" replace />;

  const statusText = STATUS_TEXT[result.status];
  const assetFlow = toAssetFlow(result);

  const chips: SummaryChip[] = [
    { label: "기대수명", value: `${result.target_age}세` },
    {
      label: "예상 자산 고갈 나이",
      value: result.depleted && result.depletion_age ? `${result.depletion_age}세` : "해당없음",
    },
    {
      label: "월 부족 금액",
      value: result.monthly_gap > 0 ? formatWon(result.monthly_gap) : "해당없음",
      isEmphasis: true,
    },
    {
      label: "자산 고갈 여부",
      value: result.depleted ? "고갈됨" : "고갈되지 않음",
      isEmphasis: true,
    },
    { label: "진단 상태", value: result.status, isEmphasis: true },
  ];

  // 진단 결과 저장 후 홈 복귀 처리
  const handleSave = () => saveMutate(result, { onSuccess: () => navigate("/") });

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title={PAGE_TITLE} />

        <div className="mt-8 flex flex-col gap-6">
          <SummaryCard
            score={getDiagnosisScore(result)}
            statusLabel={statusText.label}
            headline={statusText.headline}
            description={statusText.description}
            chips={chips}
          />

          <AssetChangeChart data={assetFlow} crossAge={findCrossAge(assetFlow)} />

          <AgeDetailTable rows={toAgeDetailRows(result)} />
        </div>

        {saveError && (
          <p className="mt-6 text-sm text-btn-active">
            {getApiErrorMessage(saveError, "저장에 실패했습니다")}
          </p>
        )}

        {/* 저장된 결과 조회 시에는 저장 버튼 미노출 */}
        {!isSaved && (
          <Button onClick={handleSave} disabled={isPending} className="mt-8">
            {isPending ? "저장 중..." : "저장하기"}
          </Button>
        )}
      </div>
      {isPending && <Loading variant="overlay" message="결과를 저장하는 중입니다" />}
    </div>
  );
}
