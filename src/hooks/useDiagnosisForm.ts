import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDiagnosisStore } from "@/stores/diagnosisStore";
import type { Gender } from "@/types/auth";
import { calculateDiagnosis } from "@/utils/diagnosis";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

export default function useDiagnosisForm() {
  const navigate = useNavigate();
  const setDiagnosis = useDiagnosisStore((state) => state.setDiagnosis);

  const [currentAge, setCurrentAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [monthlyPension, setMonthlyPension] = useState("");
  const [assets, setAssets] = useState("");
  const [gender, setGender] = useState<Gender>("female");

  const isFilled = [currentAge, monthlyExpense, monthlyPension, assets].every(
    (value) => value !== "",
  );

  // 나이는 0보다 커야 진단 가능
  const isAgeValid = currentAge === "" || Number(currentAge) > 0;

  const isSubmittable = isFilled && isAgeValid;

  const handleChange =
    (setValue: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) =>
      setValue(toNumericValue(event.target.value));

  // 진단 후 결과 화면 이동 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    const input = { currentAge, monthlyExpense, monthlyPension, assets, gender };
    setDiagnosis(input, calculateDiagnosis(input));
    navigate("/diagnosis/result");
  };

  return {
    currentAge,
    monthlyExpense,
    monthlyPension,
    assets,
    gender,
    isAgeValid,
    isSubmittable,
    handleCurrentAgeChange: handleChange(setCurrentAge),
    handleMonthlyExpenseChange: handleChange(setMonthlyExpense),
    handleMonthlyPensionChange: handleChange(setMonthlyPension),
    handleAssetsChange: handleChange(setAssets),
    setGender,
    handleSubmit,
  };
}
