import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import usePrivateInfo from "@/hooks/usePrivateInfo";
import useRetirementDiagnosisMutation from "@/queries/diagnosis/useRetirementDiagnosisMutation";
import { useAuthStore } from "@/stores/authStore";
import { useDiagnosisStore } from "@/stores/diagnosisStore";
import type { Gender } from "@/types/auth";
import { calculateAge } from "@/utils/age";
import { buildDiagnosisRequest } from "@/utils/diagnosis";
import { formatNumber } from "@/utils/format";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

// 천 단위 콤마 표기값
const toDisplayValue = (value: string) => (value === "" ? "" : formatNumber(Number(value)));

// 생년월일 기반 나이 입력값
const toAgeValue = (birthDate?: string) => {
  const age = calculateAge(birthDate ?? "");

  return age > 0 ? String(age) : "";
};

export default function useDiagnosisForm() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { privateInfo, isLoading } = usePrivateInfo();
  const setDiagnosis = useDiagnosisStore((state) => state.setDiagnosis);
  const { mutate: diagnoseMutate, isPending } = useRetirementDiagnosisMutation();

  const [currentAge, setCurrentAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [monthlyPension, setMonthlyPension] = useState("");
  const [assets, setAssets] = useState("");
  const [gender, setGender] = useState<Gender>("female");
  const [errorMessage, setErrorMessage] = useState("");

  const isInitializedRef = useRef(false);

  // 마이페이지에 등록된 값으로 채움
  useEffect(() => {
    if (isLoading || isInitializedRef.current) return;

    isInitializedRef.current = true;
    setCurrentAge(toAgeValue(user?.birthDate));
    setMonthlyExpense(privateInfo.monthlyExpense);
    setMonthlyPension(privateInfo.monthlyPension);
    setAssets(privateInfo.assets);
    setGender(user?.gender ?? "female");
  }, [isLoading, privateInfo, user]);

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
        setDiagnosis(result);
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
