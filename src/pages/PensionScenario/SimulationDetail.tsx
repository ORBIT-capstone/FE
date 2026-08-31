import { Navigate } from "react-router-dom";
import infoIcon from "@/assets/icons/infoIcon.svg";
import PageHeader from "@/components/common/header/PageHeader";
import DetailCard from "@/components/PensionScenario/DetailCard";
import { useSimulationStore } from "@/stores/simulationStore";
import { formatWon } from "@/utils/format";
import { isPensionEligible } from "@/utils/simulation";

export default function SimulationDetail() {
  const result = useSimulationStore((state) => state.result);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/pension-scenario" replace />;

  const isEligible = isPensionEligible(result.retire_months);

  // 지급액이 없는 항목은 해당없음 표기
  const toAmountValue = (amount: number) => (amount > 0 ? formatWon(amount) : "해당없음");

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-10">
        <PageHeader title="연금 시뮬레이션 자세히보기" />

        {!isEligible && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            재직기간이 10년 미만인 경우 연금 수급 대상에 해당하지 않아 퇴직일시금으로 지급됩니다.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <DetailCard
            title="근속 구간"
            rows={[
              { label: "현재 근속월수 구간", value: result.current_band },
              { label: "퇴직시 근속월수 구간", value: result.retire_band },
            ]}
          />

          <DetailCard
            title="소득 반영 계수"
            icon={<img src={infoIcon} alt="" className="size-6" />}
            rows={[{ value: `${result.income_factor}` }]}
          />

          <DetailCard
            title="기타 세부 정보"
            rows={[
              { label: "예상평균 기준소득 월액", value: formatWon(result.estimated_avg_income) },
              { label: "퇴직수당", value: toAmountValue(result.severance_pay) },
              { label: "퇴직일시금", value: toAmountValue(result.lump_sum) },
              { label: "재직연수 상한", value: `${result.service_cap_years}년` },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
