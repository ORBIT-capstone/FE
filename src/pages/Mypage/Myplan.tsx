import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import InfoCard from "@/components/common/card/InfoCard";
import PageHeader from "@/components/common/header/PageHeader";
import TabBar from "@/components/common/tab/TabBar";
import type { TabItem } from "@/components/common/tab/TabBar";
import useDiagnosisListQuery from "@/queries/diagnoses/useDiagnosisListQuery";
import { DIAGNOSIS_META } from "@/types/diagnoses";
import { formatDate } from "@/utils/format";

// 저장 일시 표기, 값이 없으면 미표기
const toSavedAt = (createdAt: string) => {
  const date = new Date(createdAt);

  return Number.isNaN(date.getTime()) ? "" : formatDate(date);
};

type PlanTab = "all" | "employed" | "retired";

const TAB_ITEMS: TabItem<PlanTab>[] = [
  { label: "전체", value: "all" },
  { label: "재직자진단", value: "employed" },
  { label: "퇴직자 진단", value: "retired" },
];

export default function Myplan() {
  const navigate = useNavigate();
  const { data: diagnoses, isLoading, error } = useDiagnosisListQuery();
  const [selectedTab, setSelectedTab] = useState<PlanTab>("all");

  // 탭 기준 내역 필터링
  const filteredPlans = (diagnoses ?? []).filter((diagnosis) => {
    if (selectedTab === "all") return true;

    return DIAGNOSIS_META[diagnosis.diagnosisType]?.group === selectedTab;
  });

  // 목록 상태별 안내 문구
  const emptyMessage = isLoading
    ? "저장된 진단 내역을 불러오는 중입니다"
    : error
      ? getApiErrorMessage(error, "진단 내역을 불러오지 못했습니다")
      : "저장된 진단 내역이 없습니다";

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-28">
        <PageHeader title="마이플랜" />

        <p className="mt-4 text-sm text-muted">최근에 진단하신 내역을 확인하실 수 있습니다</p>

        <div className="mt-8">
          <TabBar items={TAB_ITEMS} value={selectedTab} onChange={setSelectedTab} />
        </div>

        {filteredPlans.length === 0 ? (
          <p className="mt-20 text-center text-sm whitespace-pre-line text-muted">{emptyMessage}</p>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {filteredPlans.map((diagnosis) => {
              const meta = DIAGNOSIS_META[diagnosis.diagnosisType];

              return (
                <InfoCard
                  key={diagnosis.id}
                  size="large"
                  title={meta.title}
                  description={toSavedAt(diagnosis.createdAt)}
                  onClick={() => navigate(`${meta.resultPath}/${diagnosis.id}`)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
