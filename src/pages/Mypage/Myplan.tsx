import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "@/components/common/card/InfoCard";
import PageHeader from "@/components/common/header/PageHeader";
import TabBar from "@/components/common/tab/TabBar";
import type { TabItem } from "@/components/common/tab/TabBar";
import { EMPLOYED_PLAN_TYPES, RETIRED_PLAN_TYPES } from "@/mocks/myPlan";
import { useMyPlanStore } from "@/stores/myPlanStore";

type PlanTab = "all" | "employed" | "retired";

const TAB_ITEMS: TabItem<PlanTab>[] = [
  { label: "전체", value: "all" },
  { label: "재직자진단", value: "employed" },
  { label: "퇴직자 진단", value: "retired" },
];

export default function Myplan() {
  const navigate = useNavigate();
  const plans = useMyPlanStore((state) => state.plans);
  const [selectedTab, setSelectedTab] = useState<PlanTab>("all");

  // 탭 기준 내역 필터링
  const filteredPlans = plans.filter((plan) => {
    if (selectedTab === "employed") return EMPLOYED_PLAN_TYPES.includes(plan.type);
    if (selectedTab === "retired") return RETIRED_PLAN_TYPES.includes(plan.type);
    return true;
  });

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-28">
        <PageHeader title="마이플랜" />

        <p className="mt-4 text-sm text-muted">최근에 진단하신 내역을 확인하실 수 있습니다</p>

        <div className="mt-8">
          <TabBar items={TAB_ITEMS} value={selectedTab} onChange={setSelectedTab} />
        </div>

        {filteredPlans.length === 0 ? (
          <p className="mt-20 text-center text-sm text-muted">저장된 진단 내역이 없습니다</p>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {filteredPlans.map((plan) => (
              <InfoCard
                key={plan.id}
                size="large"
                title={plan.title}
                description={plan.savedAt}
                onClick={() => navigate(plan.resultPath)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
