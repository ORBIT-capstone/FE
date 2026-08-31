import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/header/PageHeader";
import Input from "@/components/common/input/Input";
import usePrivateInfoForm from "@/hooks/usePrivateInfoForm";

export default function PrivateInfoEdit() {
  const navigate = useNavigate();
  const {
    assets,
    monthlyIncome,
    monthlyExpense,
    serviceYears,
    monthlyPension,
    isSubmittable,
    handleAssetsChange,
    handleMonthlyIncomeChange,
    handleMonthlyExpenseChange,
    handleServiceYearsChange,
    handleMonthlyPensionChange,
    handleSave,
  } = usePrivateInfoForm();

  // 저장 후 마이페이지 복귀 처리
  const handleSubmit = () => {
    handleSave();
    navigate("/mypage");
  };

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="개인정보 수정" />

        <p className="mt-4 text-sm text-muted">진단 및 시뮬레이션에 활용되는 정보를 수집합니다</p>

        <div className="mt-8 flex flex-col gap-6">
          <Input
            label="보유 자산"
            unit="원"
            variant="dark"
            inputMode="numeric"
            value={assets}
            onChange={handleAssetsChange}
          />

          <Input
            label="월급(선택)"
            unit="원"
            variant="dark"
            inputMode="numeric"
            value={monthlyIncome}
            onChange={handleMonthlyIncomeChange}
          />

          <Input
            label="월 지출액"
            unit="원"
            variant="dark"
            inputMode="numeric"
            value={monthlyExpense}
            onChange={handleMonthlyExpenseChange}
          />

          <Input
            label="현재까지 근속연수"
            unit="년"
            variant="dark"
            inputMode="numeric"
            value={serviceYears}
            onChange={handleServiceYearsChange}
          />

          <Input
            label="월 연금 수령액(선택)"
            unit="원"
            variant="dark"
            inputMode="numeric"
            value={monthlyPension}
            onChange={handleMonthlyPensionChange}
          />
        </div>

        <Button onClick={handleSubmit} disabled={!isSubmittable} className="mt-auto">
          저장하기
        </Button>
      </div>
    </div>
  );
}
