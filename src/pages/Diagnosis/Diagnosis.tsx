import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import GenderSelect from "@/components/common/gender/GenderSelect";
import PageHeader from "@/components/common/header/PageHeader";
import Input from "@/components/common/input/Input";
import useDiagnosisForm from "@/hooks/useDiagnosisForm";

export default function Diagnosis() {
  const {
    currentAge,
    monthlyExpense,
    monthlyPension,
    assets,
    gender,
    isSubmittable,
    isPending,
    errorMessage,
    handleCurrentAgeChange,
    handleMonthlyExpenseChange,
    handleMonthlyPensionChange,
    handleAssetsChange,
    setGender,
    handleSubmit,
  } = useDiagnosisForm();

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="은퇴 자산 진단" />

        <p className="mt-4 text-sm leading-relaxed text-muted">
          현재 자산과 지출을 입력하시면 자산 고갈 시점과 노후 준비 상태를 진단해드립니다
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <Input
            label="현재 나이"
            unit="세"
            variant="dark"
            inputMode="numeric"
            value={currentAge}
            onChange={handleCurrentAgeChange}
          />

          <Input
            label="월 생활비"
            unit="원"
            variant="dark"
            inputMode="numeric"
            value={monthlyExpense}
            onChange={handleMonthlyExpenseChange}
          />

          <Input
            label="월 연금 수령액"
            unit="원"
            variant="dark"
            inputMode="numeric"
            placeholder="원 단위로 입력해주세요"
            value={monthlyPension}
            onChange={handleMonthlyPensionChange}
          />

          <Input
            label="보유 자산"
            unit="원"
            variant="dark"
            inputMode="numeric"
            value={assets}
            onChange={handleAssetsChange}
          />

          <GenderSelect value={gender} onChange={setGender} />
        </div>

        {errorMessage && (
          <p className="mt-6 text-sm whitespace-pre-line text-btn-active">{errorMessage}</p>
        )}

        <Button onClick={handleSubmit} disabled={!isSubmittable} className="mt-auto">
          {isPending ? "진단 중..." : "진단하기"}
        </Button>
      </div>
      {isPending && <Loading variant="overlay" message="은퇴 자산을 진단하는 중입니다" />}
    </div>
  );
}
