import { Navigate, useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import FixedBottomBar from "@/components/common/button/FixedBottomBar";
import PageHeader from "@/components/common/header/PageHeader";
import AgeDetailTable from "@/components/common/result/AgeDetailTable";
import AssetChangeChart from "@/components/common/result/AssetChangeChart";
import SummaryCard from "@/components/common/result/SummaryCard";
import type { SummaryChip } from "@/components/common/result/SummaryCard";
import { GRADE_TEXT } from "@/mocks/reemployment";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import { findCrossAge } from "@/utils/diagnosis";
import { formatManCheonWon, formatNumber } from "@/utils/format";
import { getGrade, getScore, toAgeDetailRows, toAssetFlow } from "@/utils/reemployment";

export default function ReemploymentDetail() {
  const navigate = useNavigate();
  const result = useReemploymentStore((state) => state.result);
  const savePlan = useMyPlanStore((state) => state.savePlan);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/reemployment" replace />;

  const score = getScore(result);
  const gradeText = GRADE_TEXT[getGrade(score)];
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

  // 마이플랜 내역 저장 후 홈 복귀 처리, 추후 API 저장 연결 지점
  const handleSave = () => {
    savePlan("reemployment");
    navigate("/");
  };

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-48">
        <PageHeader title="재취업 연금 감액 계산결과" />

        <div className="mt-8 flex flex-col gap-6">
          <SummaryCard
            score={score}
            statusLabel={gradeText.label}
            headline={gradeText.headline}
            description={gradeText.description}
            chips={chips}
            tone={gradeText.tone}
          />

          <AssetChangeChart data={assetFlow} crossAge={findCrossAge(assetFlow)} tone="mint" />

          <AgeDetailTable rows={toAgeDetailRows(result)} tone="mint" />
        </div>
      </div>

      <FixedBottomBar>
        <Button tone="mint" onClick={handleSave}>
          재취업 연금 감액 분석 저장하기
        </Button>

        <Button tone="yellow" onClick={() => navigate("/retirement-plan")}>
          맞춤 노후 설계가기
        </Button>
      </FixedBottomBar>
    </div>
  );
}
