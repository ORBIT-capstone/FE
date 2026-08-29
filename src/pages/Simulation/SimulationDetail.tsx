import { Navigate } from "react-router-dom";
import infoIcon from "@/assets/icons/infoIcon.svg";
import PageHeader from "@/components/common/header/PageHeader";
import DetailCard from "@/components/Simulation/DetailCard";
import { useSimulationStore } from "@/stores/simulationStore";
import { formatManWon, formatServicePeriod } from "@/utils/format";

export default function SimulationDetail() {
  const result = useSimulationStore((state) => state.result);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/simulation" replace />;

  // 연금 수급 대상은 일시금 미지급
  const allowanceValue = result.isPensionEligible
    ? "해당없음"
    : formatManWon(result.retirementAllowance);
  const lumpSumValue = result.isPensionEligible ? "해당없음" : formatManWon(result.lumpSum);

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-10">
        <PageHeader title="연금 시뮬레이션 자세히보기" />

        {!result.isPensionEligible && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            재직기간이 10년 미만인 경우 연금 수급 대상에 해당하지 않아 퇴직일시금으로 지급됩니다.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <DetailCard
            title="근속 구간"
            rows={[
              {
                label: "현재 근속월수 구간",
                value: formatServicePeriod(result.currentServiceYears),
              },
              {
                label: "퇴직시 근속월수 구간",
                value: formatServicePeriod(result.totalServiceYears),
              },
            ]}
          />

          <DetailCard
            title="소득 반영 계수"
            icon={<img src={infoIcon} alt="" className="size-6" />}
            rows={[{ value: `${result.incomeFactor}` }]}
          />

          <DetailCard
            title="기타 세부 정보"
            rows={[
              { label: "예상평균 기준소득 월액", value: formatManWon(result.averageIncome) },
              { label: "퇴직수당", value: allowanceValue },
              { label: "퇴직일시금", value: lumpSumValue },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
