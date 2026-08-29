import { Navigate, useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/header/PageHeader";
import AgeDetailTable from "@/components/Diagnosis/AgeDetailTable";
import AssetChangeChart from "@/components/Diagnosis/AssetChangeChart";
import SummaryCard from "@/components/Diagnosis/SummaryCard";
import type { SummaryChip } from "@/components/Diagnosis/SummaryCard";
import { useDiagnosisStore } from "@/stores/diagnosisStore";
import type { DiagnosisStatus } from "@/utils/diagnosis";
import { findCrossAge } from "@/utils/diagnosis";
import { formatNumber } from "@/utils/format";

// 진단 상태별 문구
const STATUS_TEXT: Record<
  DiagnosisStatus,
  { label: string; headline: string; description: string; code: string }
> = {
  sufficient: {
    label: "충분",
    headline: "충분 단계입니다",
    description:
      "현재 자산과 소득으로\n목표 은퇴 시점까지 안정적인\n생활이 가능할 것으로 예상됩니다",
    code: "SUFFICIENT",
  },
  insufficient: {
    label: "부족",
    headline: "부족 단계입니다",
    description:
      "현재 자산과 소득으로는\n목표 은퇴 시점까지 생활을\n유지하기 어려울 것으로 예상됩니다",
    code: "INSUFFICIENT",
  },
};

export default function DiagnosisResult() {
  const navigate = useNavigate();
  const result = useDiagnosisStore((state) => state.result);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/diagnosis" replace />;

  const statusText = STATUS_TEXT[result.status];

  const chips: SummaryChip[] = [
    { label: "기대수명", value: `${result.lifeExpectancy}세` },
    {
      label: "예상 자산 고갈 나이",
      value: result.depletionAge === null ? "해당없음" : `${result.depletionAge}세`,
    },
    {
      label: "월 부족 금액",
      value: `${formatNumber(result.monthlyShortage)}만원`,
      isEmphasis: true,
    },
    {
      label: "자산 고갈 여부",
      value: result.depletionAge === null ? "고갈되지 않음" : "고갈됨",
      isEmphasis: true,
    },
    { label: "진단 상태", value: statusText.code, isEmphasis: true },
  ];

  // 저장 후 홈 복귀 처리, 추후 API 저장 연결 지점
  const handleSave = () => {
    navigate("/");
  };

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="은퇴 자산 진단 결과" />

        <div className="mt-8 flex flex-col gap-6">
          <SummaryCard
            score={result.score}
            statusLabel={statusText.label}
            headline={statusText.headline}
            description={statusText.description}
            chips={chips}
          />

          <AssetChangeChart data={result.assetFlow} crossAge={findCrossAge(result.assetFlow)} />

          <AgeDetailTable rows={result.ageDetails} />
        </div>

        <Button onClick={handleSave} className="mt-8">
          저장하기
        </Button>
      </div>
    </div>
  );
}
