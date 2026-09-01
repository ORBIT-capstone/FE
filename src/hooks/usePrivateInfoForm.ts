import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { getApiErrorMessage } from "@/api/apiError";
import usePrivateInfo from "@/hooks/usePrivateInfo";
import useUpdateMeMutation from "@/queries/user/useUpdateMeMutation";
import { formatNumber } from "@/utils/format";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

// 천 단위 콤마 표기값
const toDisplayValue = (value: string) => (value === "" ? "" : formatNumber(Number(value)));

// 선택 항목은 비어 있으면 기존 값 유지
const toOptionalNumber = (value: string) => (value === "" ? undefined : Number(value));

export default function usePrivateInfoForm() {
  const { privateInfo, isLoading } = usePrivateInfo();
  const { mutate: updateMeMutate, isPending } = useUpdateMeMutation();

  const [assets, setAssets] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [serviceYears, setServiceYears] = useState("");
  const [monthlyPension, setMonthlyPension] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isInitializedRef = useRef(false);

  // 조회한 개인정보로 기존 값 채움
  useEffect(() => {
    if (isLoading || isInitializedRef.current) return;

    isInitializedRef.current = true;
    setAssets(privateInfo.assets);
    setMonthlyIncome(privateInfo.monthlyIncome);
    setMonthlyExpense(privateInfo.monthlyExpense);
    setServiceYears(privateInfo.serviceYears);
    setMonthlyPension(privateInfo.monthlyPension);
  }, [isLoading, privateInfo]);

  // 월급·월 연금 수령액은 선택 항목
  const isFilled = [assets, monthlyExpense, serviceYears].every((value) => value.trim() !== "");
  const isSubmittable = isFilled && !isPending && !isLoading;

  const handleChange =
    (setValue: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) =>
      setValue(toNumericValue(event.target.value));

  // 개인정보 수정 요청 처리
  const handleSave = (onSuccess: () => void) => {
    if (!isSubmittable) return;

    updateMeMutate(
      {
        asset: Number(assets),
        monthlyExpenses: Number(monthlyExpense),
        currentYears: Number(serviceYears),
        monthlyPension: toOptionalNumber(monthlyPension),
        monthlyIncome: toOptionalNumber(monthlyIncome),
      },
      {
        onSuccess,
        onError: (error) =>
          setErrorMessage(getApiErrorMessage(error, "개인정보 수정에 실패했습니다")),
      },
    );
  };

  return {
    // 금액 항목은 콤마 표기, 저장에는 숫자만 사용
    assets: toDisplayValue(assets),
    monthlyIncome: toDisplayValue(monthlyIncome),
    monthlyExpense: toDisplayValue(monthlyExpense),
    serviceYears,
    monthlyPension: toDisplayValue(monthlyPension),
    isSubmittable,
    isPending,
    errorMessage,
    handleAssetsChange: handleChange(setAssets),
    handleMonthlyIncomeChange: handleChange(setMonthlyIncome),
    handleMonthlyExpenseChange: handleChange(setMonthlyExpense),
    handleServiceYearsChange: handleChange(setServiceYears),
    handleMonthlyPensionChange: handleChange(setMonthlyPension),
    handleSave,
  };
}
