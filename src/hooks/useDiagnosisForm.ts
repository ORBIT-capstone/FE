import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import useRetirementDiagnosisMutation from "@/queries/diagnosis/useRetirementDiagnosisMutation";
import { useDiagnosisStore } from "@/stores/diagnosisStore";
import type { Gender } from "@/types/auth";
import { buildDiagnosisRequest } from "@/utils/diagnosis";
import { formatNumber } from "@/utils/format";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

// 천 단위 콤마 표기값
const toDisplayValue = (value: string) => (value === "" ? "" : formatNumber(Number(value)));

export default function useDiagnosisForm() {
  const navigate = useNavigate();
  const setDiagnosis = useDiagnosisStore((state) => state.setDiagnosis);
  const { mutate: diagnoseMutate, isPending } = useRetirementDiagnosisMutation();

  const [currentAge, setCurrentAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [monthlyPension, setMonthlyPension] = useState("");
  const [assets, setAssets] = useState("");
  const [gender, setGender] = useState<Gender>("female");
  const [errorMessage, setErrorMessage] = useState("");

  const isFilled = [currentAge, monthlyExpense, monthlyPension, assets].every(
    (value) => value !== "",
  );

  // 나이는 0보다 커야 진단 가능
  const isAgeValid = currentAge === "" || Number(currentAge) > 0;

  const isSubmittable = isFilled && isAgeValid && !isPending;

  const handleChange =
    (setValue: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) =>
      setValue(toNumericValue(event.target.value));

  // 진단 요청 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    const input = { currentAge, monthlyExpense, monthlyPension, assets, gender };

    diagnoseMutate(buildDiagnosisRequest(input), {
      onSuccess: (result) => {
        setDiagnosis(input, result);
        navigate("/diagnosis/result");
      },
      onError: (error) => setErrorMessage(getApiErrorMessage(error, "진단에 실패했습니다")),
    });
  };

  return {
    currentAge,
    monthlyExpense: toDisplayValue(monthlyExpense),
    monthlyPension: toDisplayValue(monthlyPension),
    assets: toDisplayValue(assets),
    gender,
    isAgeValid,
    isSubmittable,
    isPending,
    errorMessage,
    handleCurrentAgeChange: handleChange(setCurrentAge),
    handleMonthlyExpenseChange: handleChange(setMonthlyExpense),
    handleMonthlyPensionChange: handleChange(setMonthlyPension),
    handleAssetsChange: handleChange(setAssets),
    setGender,
    handleSubmit,
  };
}
