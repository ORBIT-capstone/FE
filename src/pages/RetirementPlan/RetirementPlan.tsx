import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ageIcon from "@/assets/icons/ageIcon.svg";
import assetIcon from "@/assets/icons/assetIcon.svg";
import BadIcon from "@/assets/icons/BadIcon.svg";
import calenderIcon from "@/assets/icons/calenderIcon.svg";
import extraIncomePrepareIcon from "@/assets/icons/extraIncomePrepareIcon.svg";
import hyperPrepareIcon from "@/assets/icons/hyperPrepareIcon.svg";
import MexpenseIcon from "@/assets/icons/MexpenseIcon.svg";
import needIncomeIcon from "@/assets/icons/needIncomeIcon.svg";
import SavingIcon from "@/assets/icons/SavingIcon.svg";
import savingPrepareIcon from "@/assets/icons/savingPrepareIcon.svg";
import SmileIcon from "@/assets/icons/SmileIcon.svg";
import SoSoIcon from "@/assets/icons/SoSoIcon.svg";
import Button from "@/components/common/button/Button";
import FixedBottomBar from "@/components/common/button/FixedBottomBar";
import PageHeader from "@/components/common/header/PageHeader";
import ChevronIcon from "@/components/common/icon/ChevronIcon";
import AgeDetailTable from "@/components/common/result/AgeDetailTable";
import CurrentStatusCard from "@/components/RetirementPlan/CurrentStatusCard";
import ImprovementCard from "@/components/RetirementPlan/ImprovementCard";
import KeyInfoList from "@/components/RetirementPlan/KeyInfoList";
import type { KeyInfoItem } from "@/components/RetirementPlan/KeyInfoList";
import PlanAssetChart from "@/components/RetirementPlan/PlanAssetChart";
import RecommendTypeCard from "@/components/RetirementPlan/RecommendTypeCard";
import useRetirementPlan from "@/hooks/useRetirementPlan";
import { IMPROVEMENT_TEXT, RECOMMEND_TYPE_TEXT, STATUS_LEVEL_TEXT } from "@/mocks/retirementPlan";
import type { ImprovementKey } from "@/mocks/retirementPlan";
import { useMyPlanStore } from "@/stores/myPlanStore";
import { formatNumber } from "@/utils/format";
import type { PlanRecommendType, PlanStatusLevel } from "@/utils/retirementPlan";

// 추천 유형별 아이콘
const RECOMMEND_TYPE_ICON: Record<PlanRecommendType, string> = {
  saving: savingPrepareIcon,
  extraIncome: extraIncomePrepareIcon,
  hybrid: hyperPrepareIcon,
};

// 상태 단계별 아이콘
const STATUS_LEVEL_ICON: Record<PlanStatusLevel, string> = {
  good: SmileIcon,
  soso: SoSoIcon,
  bad: BadIcon,
};

// 개선안 항목별 아이콘
const IMPROVEMENT_ICON: Record<ImprovementKey, string> = {
  saving: SavingIcon,
  income: needIncomeIcon,
  expense: MexpenseIcon,
};

export default function RetirementPlan() {
  const navigate = useNavigate();
  const { plan } = useRetirementPlan();
  const savePlan = useMyPlanStore((state) => state.savePlan);

  // 연령별 예상 내역 펼침 여부
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 마이플랜 내역 저장 후 홈 복귀 처리, 추후 API 저장 연결 지점
  const handleSave = () => {
    savePlan("retirementPlan");
    navigate("/");
  };

  // 저장된 진단 내역이 없을 때 안내 화면
  if (!plan) {
    return (
      <div className="min-h-dvh w-full bg-bg-base">
        <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-32">
          <PageHeader title="맞춤 노후 설계" />

          <p className="mt-20 text-center text-sm leading-relaxed text-muted">
            저장된 진단 내역이 없습니다
            <br />
            진단을 먼저 진행하시면 맞춤 설계를 확인하실 수 있습니다
          </p>
        </div>

        <FixedBottomBar>
          <Button tone="yellow" onClick={() => navigate("/diagnosis")}>
            진단하러 가기
          </Button>
        </FixedBottomBar>
      </div>
    );
  }

  const recommendText = RECOMMEND_TYPE_TEXT[plan.recommendType];

  const improvements: { key: ImprovementKey; amount: number }[] = [
    { key: "saving", amount: plan.extraSaving },
    { key: "income", amount: plan.extraIncome },
    { key: "expense", amount: plan.expenseAdjust },
  ];

  const keyInfoItems: KeyInfoItem[] = [
    { icon: ageIcon, label: "현재 나이", field: "current_age", value: `${plan.currentAge}세` },
    {
      icon: SmileIcon,
      label: "목표 준비 상태 (추천 적용 시)",
      field: "target_status",
      value: plan.targetStatus,
    },
    {
      icon: assetIcon,
      label: "자산 고갈 여부",
      field: "depleted",
      value: plan.depleted ? "예" : "아니오",
    },
    {
      icon: calenderIcon,
      label: "예상 고갈 나이",
      field: "depletion_age",
      value: plan.depletionAge === null ? "-" : `${plan.depletionAge}세`,
    },
  ];

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-32">
        <PageHeader title="맞춤 노후 설계" />

        <p className="mt-4 text-sm text-muted">진단 결과를 바탕으로 개선안을 확인하세요</p>

        <div className="mt-6 flex flex-col gap-6">
          <RecommendTypeCard
            icon={RECOMMEND_TYPE_ICON[plan.recommendType]}
            title={recommendText.title}
            description={recommendText.description}
          />

          <CurrentStatusCard
            status={plan.currentStatus}
            description={STATUS_LEVEL_TEXT[plan.statusLevel]}
            score={plan.score}
            icon={STATUS_LEVEL_ICON[plan.statusLevel]}
          />

          <section>
            <h2 className="text-base font-bold text-white">개선안 추천</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              아래 세 가지 항목을 권장 수준 이상으로 확보하면 목표 연령까지 자산을 유지할 수
              있습니다.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {improvements.map((improvement) => (
                <ImprovementCard
                  key={improvement.key}
                  icon={IMPROVEMENT_ICON[improvement.key]}
                  title={IMPROVEMENT_TEXT[improvement.key].title}
                  prefix={IMPROVEMENT_TEXT[improvement.key].prefix}
                  amount={`${formatNumber(improvement.amount)}원`}
                  suffix={IMPROVEMENT_TEXT[improvement.key].suffix}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-white">핵심 정보</h2>

            <div className="mt-4">
              <KeyInfoList items={keyInfoItems} />
            </div>
          </section>

          <PlanAssetChart data={plan.assetFlow} />

          <section>
            <button
              type="button"
              onClick={() => setIsDetailOpen((prev) => !prev)}
              className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/15 bg-card px-5 py-4"
            >
              <span className="text-sm font-bold text-white">연령별 예상 내역 보기</span>
              <ChevronIcon direction={isDetailOpen ? "up" : "down"} className="size-5 text-white" />
            </button>

            {isDetailOpen && (
              <div className="mt-3">
                <AgeDetailTable rows={plan.ageDetails} tone="yellow" />
              </div>
            )}
          </section>
        </div>
      </div>

      <FixedBottomBar>
        <Button tone="yellow" onClick={handleSave}>
          나의 노후 설계 저장하기
        </Button>
      </FixedBottomBar>
    </div>
  );
}
