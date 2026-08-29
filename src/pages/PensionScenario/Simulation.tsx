import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/header/PageHeader";
import Input from "@/components/common/input/Input";
import useSimulationForm from "@/hooks/useSimulationForm";

export default function Simulation() {
  const {
    currentAge,
    retireAge,
    monthlyIncome,
    serviceYears,
    isRetireAgeValid,
    isSubmittable,
    handleCurrentAgeChange,
    handleRetireAgeChange,
    handleMonthlyIncomeChange,
    handleServiceYearsChange,
    handleSubmit,
  } = useSimulationForm();

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="연금 시뮬레이션" />

        <p className="mt-4 text-sm leading-relaxed text-muted">
          재직 정보를 입력하시면 예상 월 연금액과 퇴직급여를 계산해 드립니다
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

          <div>
            <Input
              label="퇴직 예정 나이"
              unit="세"
              variant="dark"
              inputMode="numeric"
              value={retireAge}
              onChange={handleRetireAgeChange}
            />

            {!isRetireAgeValid && (
              <p className="mt-2 text-sm text-btn-active">
                퇴직 예정 나이는 현재 나이보다 커야 합니다
              </p>
            )}
          </div>

          <Input
            label="현재 월 소득 (세전)"
            unit="만원"
            variant="dark"
            inputMode="numeric"
            placeholder="예 ) 1,800,000"
            value={monthlyIncome}
            onChange={handleMonthlyIncomeChange}
          />

          <Input
            label="현재까지 근속연수"
            unit="년"
            variant="dark"
            inputMode="numeric"
            value={serviceYears}
            onChange={handleServiceYearsChange}
          />
        </div>

        <Button onClick={handleSubmit} disabled={!isSubmittable} className="mt-auto">
          시뮬레이션 실행
        </Button>
      </div>
    </div>
  );
}
