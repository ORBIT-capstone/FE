import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import ageIcon from "@/assets/icons/ageIcon.svg";
import assetIcon from "@/assets/icons/assetIcon.svg";
import BadIcon from "@/assets/icons/BadIcon.svg";
import calenderIcon from "@/assets/icons/calenderIcon.svg";
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
import {
  EXPENSE_ENOUGH_TEXT,
  EXPENSE_PROPER_TEXT,
  IMPROVEMENT_TEXT,
  RECOMMEND_TYPE_TEXT,
  STATUS_TEXT,
} from "@/mocks/retirementPlan";
import useDiagnosisDetailQuery from "@/queries/diagnoses/useDiagnosisDetailQuery";
import useSaveDiagnosisMutation from "@/queries/diagnoses/useSaveDiagnosisMutation";
import type { ReadinessStatus } from "@/types/diagnosis";
import type { RecommendationType } from "@/types/retirementPlan";
import { formatWon } from "@/utils/format";
import { getExpenseAdjust, getScore, toAgeDetailRows, toAssetFlow } from "@/utils/retirementPlan";

// 추천 유형별 아이콘
const RECOMMEND_TYPE_ICON: Record<RecommendationType, string> = {
  SUFFICIENT: SmileIcon,
  SAVING_ONLY: savingPrepareIcon,
  SAVING_AND_INCOME: hyperPrepareIcon,
};

// 준비 상태별 아이콘
const STATUS_ICON: Record<ReadinessStatus, string> = {
  SUFFICIENT: SmileIcon,
  MIDDLE: SoSoIcon,
  INSUFFICIENT: BadIcon,
};

export default function RetirementPlan() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 마이플랜 진입이면 저장된 결과를 조회하고 재계산하지 않음
  const savedId = Number(id);
  const isSaved = id !== undefined && Number.isFinite(savedId);

  const {
    data: savedPlan,
    isLoading: isSavedLoading,
    error: savedError,
  } = useDiagnosisDetailQuery("RETIREMENT_RECOMMENDATION", isSaved ? savedId : null);

  const {
    plan: calculatedPlan,
    baseInfo,
    hasRequiredInfo,
    isPending,
    errorMessage,
  } = useRetirementPlan(isSaved);

  const {
    mutate: saveMutate,
    isPending: isSaving,
    error: saveError,
  } = useSaveDiagnosisMutation("RETIREMENT_RECOMMENDATION");

  // 연령별 예상 내역 펼침 여부
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const plan = isSaved ? (savedPlan?.result ?? null) : calculatedPlan;

  // 노후 설계 결과 저장 후 홈 복귀 처리
  const handleSave = () => {
    if (!plan) return;

    saveMutate(plan, { onSuccess: () => navigate("/") });
  };

  // 개인정보가 없거나 요청 실패·로딩 중 안내 화면
  if (!plan) {
    const guideMessage = isSaved
      ? isSavedLoading
        ? "저장된 설계를 불러오는 중입니다"
        : getApiErrorMessage(savedError, "저장된 설계를 찾을 수 없습니다")
      : !hasRequiredInfo
        ? "개인정보를 먼저 등록하시면\n맞춤 설계를 확인하실 수 있습니다"
        : isPending
          ? "맞춤 설계를 불러오는 중입니다"
          : errorMessage || "맞춤 설계를 불러오지 못했습니다";

    return (
      <div className="min-h-dvh w-full bg-bg-base">
        <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-32">
          <PageHeader title="맞춤 노후 설계" />

          <p className="mt-20 text-center text-sm leading-relaxed whitespace-pre-line text-muted">
            {guideMessage}
          </p>
        </div>

        {!isSaved && !isPending && (
          <FixedBottomBar>
            <Button tone="yellow" onClick={() => navigate("/mypage/private-info")}>
              개인정보 등록하러 가기
            </Button>
          </FixedBottomBar>
        )}
      </div>
    );
  }

  const recommendText = RECOMMEND_TYPE_TEXT[plan.recommendation_type];
  const expenseAdjust = getExpenseAdjust(baseInfo.monthlyExpense);

  const improvements = [
    { key: "saving" as const, icon: SavingIcon, amount: plan.required_saving },
    { key: "income" as const, icon: needIncomeIcon, amount: plan.required_income },
    { key: "expense" as const, icon: MexpenseIcon, amount: expenseAdjust.amount },
  ];

  const keyInfoItems: KeyInfoItem[] = [
    { icon: ageIcon, label: "현재 나이", field: "current_age", value: `${plan.current_age}세` },
    {
      icon: SmileIcon,
      label: "목표 준비 상태 (추천 적용 시)",
      field: "target_status",
      value: plan.target_status,
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
      value: plan.depletion_age === null ? "-" : `${plan.depletion_age}세`,
    },
  ];

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-32">
        <PageHeader title="맞춤 노후 설계" />

        <p className="mt-4 text-sm text-muted">진단 결과를 바탕으로 개선안을 확인하세요</p>

        <div className="mt-6 flex flex-col gap-6">
          <RecommendTypeCard
            icon={RECOMMEND_TYPE_ICON[plan.recommendation_type]}
            title={recommendText.title}
            description={recommendText.description}
          />

          <CurrentStatusCard
            status={plan.status}
            description={STATUS_TEXT[plan.status]}
            score={getScore(plan)}
            icon={STATUS_ICON[plan.status]}
          />

          <section>
            <h2 className="text-base font-bold text-white">개선안 추천</h2>
            <p className="mt-2 text-xs leading-relaxed break-keep text-muted">
              아래 세 가지 항목을 권장 수준 이상으로 확보하면 목표 연령까지 자산을 유지할 수
              있습니다.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {improvements.map((improvement) => (
                <ImprovementCard
                  key={improvement.key}
                  icon={improvement.icon}
                  title={IMPROVEMENT_TEXT[improvement.key].title}
                  prefix={IMPROVEMENT_TEXT[improvement.key].prefix}
                  amount={formatWon(improvement.amount)}
                  suffix={IMPROVEMENT_TEXT[improvement.key].suffix}
                  // 조정이 필요 없을 때는 안내 문구로 대체
                  noticeText={
                    improvement.key === "expense" && expenseAdjust.level !== "adjust"
                      ? expenseAdjust.level === "enough"
                        ? EXPENSE_ENOUGH_TEXT
                        : EXPENSE_PROPER_TEXT
                      : undefined
                  }
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

          <PlanAssetChart data={toAssetFlow(plan)} />

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
                <AgeDetailTable rows={toAgeDetailRows(plan)} tone="yellow" />
              </div>
            )}
          </section>
        </div>

        {saveError && (
          <p className="mt-6 text-sm text-btn-active">
            {getApiErrorMessage(saveError, "저장에 실패했습니다")}
          </p>
        )}
      </div>

      {/* 저장된 결과 조회 시에는 저장 버튼 미노출 */}
      {!isSaved && (
        <FixedBottomBar>
          <Button tone="yellow" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "저장 중..." : "나의 노후 설계 저장하기"}
          </Button>
        </FixedBottomBar>
      )}
    </div>
  );
}
