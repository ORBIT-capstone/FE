import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
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
    isPending,
    errorMessage,
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

        <p className="mt-4 text-sm leading-relaxed break-keep text-justify text-muted">
          재직 정보를 입력하시면 예상 월 연금액과 퇴직급여를{" "}
          <span className="whitespace-nowrap">계산해 드립니다</span>
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
            unit="원"
            variant="dark"
            inputMode="numeric"
            placeholder="원 단위로 입력해주세요"
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

        {errorMessage && (
          <p className="mt-6 text-sm whitespace-pre-line text-btn-active">{errorMessage}</p>
        )}

        <Button onClick={handleSubmit} disabled={!isSubmittable} className="mt-auto">
          {isPending ? "계산 중..." : "시뮬레이션 실행"}
        </Button>
      </div>
      {isPending && <Loading variant="overlay" message="연금을 계산하는 중입니다" />}
    </div>
  );
}
