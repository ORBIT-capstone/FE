import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSimulationStore } from "@/stores/simulationStore";
import { calculateSimulation } from "@/utils/simulation";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

export default function useSimulationForm() {
  const navigate = useNavigate();
  const setSimulation = useSimulationStore((state) => state.setSimulation);

  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [serviceYears, setServiceYears] = useState("");

  const isFilled = [currentAge, retireAge, monthlyIncome, serviceYears].every(
    (value) => value !== "",
  );

  // 퇴직 예정 나이가 현재 나이보다 큰지 여부
  const isRetireAgeValid =
    currentAge === "" || retireAge === "" || Number(retireAge) > Number(currentAge);

  const isSubmittable = isFilled && isRetireAgeValid;

  const handleChange =
    (setValue: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) =>
      setValue(toNumericValue(event.target.value));

  // 계산 후 결과 화면 이동 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    const input = { currentAge, retireAge, monthlyIncome, serviceYears };
    setSimulation(input, calculateSimulation(input));
    navigate("/pension-scenario/result");
  };

  return {
    currentAge,
    retireAge,
    monthlyIncome,
    serviceYears,
    isRetireAgeValid,
    isSubmittable,
    handleCurrentAgeChange: handleChange(setCurrentAge),
    handleRetireAgeChange: handleChange(setRetireAge),
    handleMonthlyIncomeChange: handleChange(setMonthlyIncome),
    handleServiceYearsChange: handleChange(setServiceYears),
    handleSubmit,
  };
}
