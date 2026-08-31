import { Navigate, useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import FixedBottomBar from "@/components/common/button/FixedBottomBar";
import PageHeader from "@/components/common/header/PageHeader";
import ScoreGauge from "@/components/common/result/ScoreGauge";
import PensionCompareChart from "@/components/Reemployment/PensionCompareChart";
import ResultSlider from "@/components/Reemployment/ResultSlider";
import { STATUS_TEXT } from "@/mocks/reemployment";
import { useAuthStore } from "@/stores/authStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import { formatManCheonWon, formatNumber } from "@/utils/format";
import { getOriginalPension, getReductionRate, getScore } from "@/utils/reemployment";

export default function ReemploymentResult() {
  const navigate = useNavigate();
  const name = useAuthStore((state) => state.user?.name);
  const result = useReemploymentStore((state) => state.result);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/reemployment" replace />;

  const originalPension = getOriginalPension(result);
  const reductionRate = getReductionRate(result);
  const score = getScore(result);
  const statusText = STATUS_TEXT[result.status];

  const pensionSlide = (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-2xl leading-relaxed font-medium text-white">
        {name}님의 재취업 후
        <br />월 예상 연금액은
        <br />
        <span className="font-bold text-mint">{formatNumber(result.reduced_monthly_pension)}</span>
        원입니다.
        <br />
        {name}님의 노후 자산 대비 상태는
      </h2>

      <div className="mt-12">
        <ScoreGauge
          score={score}
          statusLabel={statusText.label}
          tone={statusText.tone}
          size="large"
        />
      </div>
    </div>
  );

  const reductionSlide = (
    <div className="flex h-full flex-col">
      <h2 className="mt-20 text-center text-2xl leading-relaxed font-medium text-white">
        {name}님의 재취업 후
        <br />월 연금 감액액은
        <br />
        <span className="font-bold text-mint">
          {formatNumber(result.monthly_reduction)}(-{reductionRate}%)
        </span>
        원입니다.
        <br />월 소득이{" "}
        <span className="font-bold text-mint">
          {formatManCheonWon(result.full_payment_income_threshold)}
        </span>{" "}
        이하라면
        <br />
        연금을 감액 없이
        <br />
        전액 수령할 수 있습니다.
      </h2>

      <div className="mt-auto h-52 w-full">
        <PensionCompareChart
          originalPension={originalPension}
          reducedPension={result.reduced_monthly_pension}
        />
      </div>
    </div>
  );

  return (
    <div className="h-dvh w-full bg-bg-base">
      <div className="mx-auto flex h-dvh w-full max-w-97.5 flex-col px-7 pb-32">
        <PageHeader title="재취업 연금 감액 계산결과" />

        <ResultSlider slides={[pensionSlide, reductionSlide]} />
      </div>

      <FixedBottomBar>
        <Button tone="mint" onClick={() => navigate("/reemployment/detail")}>
          세부 분석 한눈에 보기
        </Button>
      </FixedBottomBar>
    </div>
  );
}
