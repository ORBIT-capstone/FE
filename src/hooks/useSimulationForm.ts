import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import usePrivateInfo from "@/hooks/usePrivateInfo";
import useEmployeeSimulateMutation from "@/queries/simulation/useEmployeeSimulateMutation";
import { useAuthStore } from "@/stores/authStore";
import { useSimulationStore } from "@/stores/simulationStore";
import { calculateAge } from "@/utils/age";
import { MAX_RETIRE_AGE } from "@/mocks/simulation";
import { formatNumber } from "@/utils/format";
import { buildSimulateRequest } from "@/utils/simulation";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

// 생년월일 기반 나이 입력값
const toAgeValue = (birthDate?: string) => {
  const age = calculateAge(birthDate ?? "");

  return age > 0 ? String(age) : "";
};

export default function useSimulationForm() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { privateInfo, isLoading } = usePrivateInfo();
  const setSimulation = useSimulationStore((state) => state.setSimulation);
  const { mutate: simulateMutate, isPending } = useEmployeeSimulateMutation();

  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [serviceYears, setServiceYears] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isInitializedRef = useRef(false);

  // 마이페이지에 등록된 값으로 채움, 퇴직 예정 나이는 직접 입력
  useEffect(() => {
    if (isLoading || isInitializedRef.current) return;

    isInitializedRef.current = true;
    setCurrentAge(toAgeValue(user?.birthDate));
    setMonthlyIncome(privateInfo.monthlyIncome);
    setServiceYears(privateInfo.serviceYears);
  }, [isLoading, privateInfo, user]);

  const isFilled = [currentAge, retireAge, monthlyIncome, serviceYears].every(
    (value) => value !== "",
  );

  // 퇴직 예정 나이가 현재 나이보다 크고 상한 이하인지 여부
  const isRetireAgeValid =
    retireAge === "" ||
    ((currentAge === "" || Number(retireAge) > Number(currentAge)) &&
      Number(retireAge) <= MAX_RETIRE_AGE);

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
        setSimulation(result);
        navigate("/pension-scenario/result");
      },
      onError: (error) => setErrorMessage(getApiErrorMessage(error, "시뮬레이션에 실패했습니다")),
    });
  };

  return {
    currentAge,
    retireAge,
    maxRetireAge: MAX_RETIRE_AGE,
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
