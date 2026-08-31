import { Navigate, useNavigate } from "react-router-dom";
import astronaut from "@/assets/images/astronut2.svg";
import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/header/PageHeader";
import { useAuthStore } from "@/stores/authStore";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { useSimulationStore } from "@/stores/simulationStore";
import { formatNumber } from "@/utils/format";

export default function SimulationResult() {
  const navigate = useNavigate();
  const name = useAuthStore((state) => state.user?.name);
  const result = useSimulationStore((state) => state.result);
  const savePlan = useMyPlanStore((state) => state.savePlan);

  // 결과 없이 직접 진입 시 입력 화면 복귀
  if (!result) return <Navigate to="/pension-scenario" replace />;

  const amountLabel = result.isPensionEligible ? "예상 월 연금액은" : "예상 퇴직일시금은";
  const amount = result.isPensionEligible ? result.monthlyPension : result.lumpSum;

  // 마이플랜 내역 저장 후 홈 복귀 처리, 추후 API 저장 연결 지점
  const handleSave = () => {
    savePlan("pensionSimulation");
    navigate("/");
  };

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="연금 시뮬레이션 결과" />

        <h2 className="mt-20 text-center text-2xl leading-relaxed font-medium text-white">
          {name}님의 총 재직 월수는{" "}
          <span className="text-3xl font-bold text-btn-active">{result.totalServiceYears}</span>
          년이며
          <br />
          {amountLabel}
          <br />
          <span className="text-3xl font-bold text-btn-active">{formatNumber(amount)}</span>원
          입니다
        </h2>

        <img src={astronaut} alt="" className="mx-auto mt-14 w-80" />

        <div className="mt-auto flex flex-col gap-3">
          <Button onClick={handleSave}>정보 저장하기</Button>

          <Button tone="secondary" onClick={() => navigate("/pension-scenario/detail")}>
            자세히 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
