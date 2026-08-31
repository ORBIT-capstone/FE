import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import useEmployeeSimulateMutation from "@/queries/simulation/useEmployeeSimulateMutation";
import { useSimulationStore } from "@/stores/simulationStore";
import { formatNumber } from "@/utils/format";
import { buildSimulateRequest } from "@/utils/simulation";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

export default function useSimulationForm() {
  const navigate = useNavigate();
  const setSimulation = useSimulationStore((state) => state.setSimulation);
  const { mutate: simulateMutate, isPending } = useEmployeeSimulateMutation();

  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [serviceYears, setServiceYears] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isFilled = [currentAge, retireAge, monthlyIncome, serviceYears].every(
    (value) => value !== "",
  );

  // 퇴직 예정 나이가 현재 나이보다 큰지 여부
  const isRetireAgeValid =
    currentAge === "" || retireAge === "" || Number(retireAge) > Number(currentAge);

  const isSubmittable = isFilled && isRetireAgeValid && !isPending;

  const handleChange =
    (setValue: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) =>
      setValue(toNumericValue(event.target.value));

  // 시뮬레이션 요청 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    const input = { currentAge, retireAge, monthlyIncome, serviceYears };

    simulateMutate(buildSimulateRequest(input), {
      onSuccess: (result) => {
        setSimulation(input, result);
        navigate("/pension-scenario/result");
      },
      onError: (error) => setErrorMessage(getApiErrorMessage(error, "시뮬레이션에 실패했습니다")),
    });
  };

  return {
    currentAge,
    retireAge,
    // 천 단위 콤마 표기값, 요청에는 숫자만 사용
    monthlyIncome: monthlyIncome === "" ? "" : formatNumber(Number(monthlyIncome)),
    serviceYears,
    isRetireAgeValid,
    isSubmittable,
    isPending,
    errorMessage,
    handleCurrentAgeChange: handleChange(setCurrentAge),
    handleRetireAgeChange: handleChange(setRetireAge),
    handleMonthlyIncomeChange: handleChange(setMonthlyIncome),
    handleServiceYearsChange: handleChange(setServiceYears),
    handleSubmit,
  };
}
