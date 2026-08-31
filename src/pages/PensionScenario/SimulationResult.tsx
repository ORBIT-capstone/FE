import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import astronaut from "@/assets/images/astronut2.svg";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/header/PageHeader";
import ResultPlaceholder from "@/components/common/result/ResultPlaceholder";
import useDiagnosisResult from "@/hooks/useDiagnosisResult";
import useSaveDiagnosisMutation from "@/queries/diagnoses/useSaveDiagnosisMutation";
import { useAuthStore } from "@/stores/authStore";
import { useSimulationStore } from "@/stores/simulationStore";
import { formatNumber, formatServiceMonths } from "@/utils/format";
import { isPensionEligible } from "@/utils/simulation";

const PAGE_TITLE = "연금 시뮬레이션 결과";

export default function SimulationResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  const name = useAuthStore((state) => state.user?.name);
  const calculatedResult = useSimulationStore((state) => state.result);
  const { result, isSaved, isLoading, errorMessage } = useDiagnosisResult(
    "EMPLOYEE_PENSION",
    calculatedResult,
  );
  const {
    mutate: saveMutate,
    isPending,
    error: saveError,
  } = useSaveDiagnosisMutation("EMPLOYEE_PENSION");

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
  const amountLabel = isEligible ? "예상 월 연금액은" : "예상 퇴직일시금은";
  const amount = isEligible ? result.monthly_pension : result.lump_sum;

  // 시뮬레이션 결과 저장 후 홈 복귀 처리
  const handleSave = () => saveMutate(result, { onSuccess: () => navigate("/") });

  // 저장된 결과는 ID 를 유지한 상세 경로로 이동
  const detailPath = isSaved ? `/pension-scenario/detail/${id}` : "/pension-scenario/detail";

  return (
    <div className="min-h-svh w-full bg-bg-base">
      <div className="mx-auto flex min-h-svh w-full max-w-97.5 flex-col px-7 pb-page-safe">
        <PageHeader title={PAGE_TITLE} />

        <h2 className="mt-20 text-center text-2xl leading-relaxed font-medium text-white">
          {name}님의 총 재직 월수는
          <br />
          <span className="text-3xl font-bold text-btn-active">
            {formatServiceMonths(result.retire_months)}
          </span>
          이며
          <br />
          {amountLabel}
          <br />
          <span className="text-3xl font-bold text-btn-active">{formatNumber(amount)}</span>원
          입니다
        </h2>

        <img src={astronaut} alt="" className="mx-auto mt-8 w-80" />

        {saveError && (
          <p className="mt-6 text-center text-sm text-btn-active">
            {getApiErrorMessage(saveError, "저장에 실패했습니다")}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3">
          {/* 저장된 결과 조회 시에는 저장 버튼 미노출 */}
          {!isSaved && (
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "저장 중..." : "정보 저장하기"}
            </Button>
          )}

          <Button tone="secondary" onClick={() => navigate(detailPath)}>
            자세히 보기
          </Button>
        </div>
      </div>
      {isPending && <Loading variant="overlay" message="결과를 저장하는 중입니다" />}
    </div>
  );
}
