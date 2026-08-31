import { Navigate } from "react-router-dom";
import PageHeader from "@/components/common/header/PageHeader";
import ResultPlaceholder from "@/components/common/result/ResultPlaceholder";
import InfoTooltip from "@/components/common/tooltip/InfoTooltip";
import DetailCard from "@/components/PensionScenario/DetailCard";
import useDiagnosisResult from "@/hooks/useDiagnosisResult";
import { INCOME_FACTOR_NOTICE } from "@/mocks/simulation";
import { useSimulationStore } from "@/stores/simulationStore";
import { formatWon } from "@/utils/format";
import { isPensionEligible } from "@/utils/simulation";

const PAGE_TITLE = "연금 시뮬레이션 자세히보기";

export default function SimulationDetail() {
  const calculatedResult = useSimulationStore((state) => state.result);
  const { result, isSaved, isLoading, errorMessage } = useDiagnosisResult(
    "EMPLOYEE_PENSION",
    calculatedResult,
  );

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
  if (!result) return <Navigate to="/pension-scenario" replace />;

  const isEligible = isPensionEligible(result.retire_months);

  // 지급액이 없는 항목은 해당없음 표기
  const toAmountValue = (amount: number) => (amount > 0 ? formatWon(amount) : "해당없음");

  return (
    <div className="min-h-svh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-page-safe">
        <PageHeader title={PAGE_TITLE} />

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
            icon={<InfoTooltip message={INCOME_FACTOR_NOTICE} label="소득 반영 계수 설명 보기" />}
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
