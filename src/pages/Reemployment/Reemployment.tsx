import ageIcon from "@/assets/icons/ageIcon.svg";
import assetIcon from "@/assets/icons/assetIcon.svg";
import expenseIcon from "@/assets/icons/expenseIcon.svg";
import mPensionIcon from "@/assets/icons/MpenisonIcon.svg";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import FixedBottomBar from "@/components/common/button/FixedBottomBar";
import MyInfoCard from "@/components/common/card/MyInfoCard";
import type { MyInfoItem } from "@/components/common/card/MyInfoCard";
import PageHeader from "@/components/common/header/PageHeader";
import Input from "@/components/common/input/Input";
import useReemploymentForm from "@/hooks/useReemploymentForm";
import { formatManWon } from "@/utils/format";

export default function Reemployment() {
  const {
    baseInfo,
    monthlyIncome,
    isSubmittable,
    isPending,
    errorMessage,
    handleMonthlyIncomeChange,
    handleSubmit,
    handleEditClick,
  } = useReemploymentForm();

  // 마이페이지 저장값 기반 내 정보
  const myInfoItems: [MyInfoItem, MyInfoItem, MyInfoItem, MyInfoItem] = [
    { icon: ageIcon, label: "현재 나이", value: `${baseInfo.currentAge}세` },
    { icon: assetIcon, label: "보유 자산", value: formatManWon(baseInfo.assets) },
    { icon: expenseIcon, label: "월 생활비", value: formatManWon(baseInfo.monthlyExpense) },
    { icon: mPensionIcon, label: "월 연금 수령액", value: formatManWon(baseInfo.monthlyPension) },
  ];

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-32">
        <PageHeader title="재취업 연금 감액 계산" />

        <p className="mt-4 text-sm leading-relaxed text-muted">
          재취업 후 예상 소득에 따른 연금 감액 여부와 실제 받을 수 있는 금액을 간편하게
          계산해보세요.
        </p>

        <div className="mt-8">
          <MyInfoCard items={myInfoItems} editLabel="수정하기" onEditClick={handleEditClick} />
        </div>

        <div className="mt-8">
          <Input
            label="월 소득"
            unit="원"
            variant="dark"
            inputMode="numeric"
            placeholder="원 단위로 입력해주세요"
            value={monthlyIncome}
            onChange={handleMonthlyIncomeChange}
          />
        </div>

        {errorMessage && (
          <p className="mt-6 text-sm whitespace-pre-line text-btn-active">{errorMessage}</p>
        )}
      </div>

      <FixedBottomBar>
        <Button tone="mint" onClick={handleSubmit} disabled={!isSubmittable}>
          {isPending ? "계산 중..." : "재취업 연금 감액 계산하기"}
        </Button>
      </FixedBottomBar>
      {isPending && <Loading variant="overlay" message="연금 감액을 계산하는 중입니다" />}
    </div>
  );
}
