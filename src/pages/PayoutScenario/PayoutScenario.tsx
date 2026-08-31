import ageIcon from "@/assets/icons/ageIcon.svg";
import assetIcon from "@/assets/icons/assetIcon.svg";
import expenseIcon from "@/assets/icons/expenseIcon.svg";
import serviceYearIcon from "@/assets/icons/serviceYearIcon.svg";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import MyInfoCard from "@/components/common/card/MyInfoCard";
import type { MyInfoItem } from "@/components/common/card/MyInfoCard";
import ChipGroup from "@/components/common/chip/ChipGroup";
import type { ChipItem } from "@/components/common/chip/ChipGroup";
import PageHeader from "@/components/common/header/PageHeader";
import InlineEditField from "@/components/common/input/InlineEditField";
import usePayoutScenarioForm from "@/hooks/usePayoutScenarioForm";
import { formatManWon } from "@/utils/format";

const EARLY_YEAR_ITEMS: ChipItem<number>[] = [1, 2, 3, 4, 5].map((year) => ({
  label: `${year}년`,
  value: year,
}));

// 예상 월 연금 표기, 미입력이면 서버 추정 안내
const toPensionText = (value: string) => (value === "" ? "자동 계산" : formatManWon(Number(value)));

export default function PayoutScenario() {
  const {
    baseInfo,
    earlyYears,
    monthlyPension,
    setMonthlyPension,
    isPending,
    isSubmittable,
    errorMessage,
    setEarlyYears,
    handleSubmit,
    handleEditClick,
  } = usePayoutScenarioForm();

  // 회원 정보·개인정보 기반 내 정보
  const myInfoItems: [MyInfoItem, MyInfoItem, MyInfoItem, MyInfoItem] = [
    { icon: ageIcon, label: "현재 나이", value: `${baseInfo.currentAge}세` },
    { icon: assetIcon, label: "보유 자산", value: formatManWon(baseInfo.assets) },
    { icon: expenseIcon, label: "월 생활비", value: formatManWon(baseInfo.monthlyExpense) },
    { icon: serviceYearIcon, label: "근속연수", value: `${baseInfo.serviceYears}년` },
  ];

  return (
    <div className="min-h-svh w-full bg-bg-base">
      <div className="mx-auto flex min-h-svh w-full max-w-97.5 flex-col px-7 pb-page-safe">
        <PageHeader title="수령방식별 시나리오 비교" />

        <p className="mt-4 text-sm leading-relaxed break-keep text-justify text-muted">
          정상·조기·일시금·분할 수령에 따른 자산 변화를 비교하고, 나에게 맞는 수령 방식을
          확인해보세요.
        </p>

        <div className="mt-8">
          <MyInfoCard items={myInfoItems} onEditClick={handleEditClick} />
        </div>

        <div className="mt-8">
          <InlineEditField
            label="예상 월 연금"
            value={monthlyPension}
            onChange={setMonthlyPension}
            formatValue={toPensionText}
            unit="원"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-base font-bold text-white">조기수령 연수 선택</h2>
          <p className="mt-2 text-sm text-muted">몇 년 일찍 연금을 수령할지 선택해주세요</p>

          <div className="mt-4">
            <ChipGroup items={EARLY_YEAR_ITEMS} value={earlyYears} onChange={setEarlyYears} />
          </div>
        </div>

        {errorMessage && (
          <p className="mt-6 text-sm whitespace-pre-line text-btn-active">{errorMessage}</p>
        )}

        <Button onClick={handleSubmit} disabled={!isSubmittable} className="mt-auto">
          {isPending ? "비교 중..." : "시나리오 비교하기"}
        </Button>
      </div>
      {isPending && <Loading variant="overlay" message="수령방식을 비교하는 중입니다" />}
    </div>
  );
}
