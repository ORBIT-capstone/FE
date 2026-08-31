import { useState } from "react";
import type { ChangeEvent } from "react";
import { useProfileStore } from "@/stores/profileStore";
import { formatNumber } from "@/utils/format";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

// 천 단위 콤마 표기값
const toDisplayValue = (value: string) => (value === "" ? "" : formatNumber(Number(value)));

export default function usePrivateInfoForm() {
  const privateInfo = useProfileStore((state) => state.privateInfo);
  const setPrivateInfo = useProfileStore((state) => state.setPrivateInfo);

  // 기존 개인정보 값으로 초기화
  const [assets, setAssets] = useState(privateInfo.assets);
  const [monthlyIncome, setMonthlyIncome] = useState(privateInfo.monthlyIncome);
  const [monthlyExpense, setMonthlyExpense] = useState(privateInfo.monthlyExpense);
  const [serviceYears, setServiceYears] = useState(privateInfo.serviceYears);
  const [monthlyPension, setMonthlyPension] = useState(privateInfo.monthlyPension);

  // 월급·월 연금 수령액은 선택 항목
  const isSubmittable = [assets, monthlyExpense, serviceYears].every(
    (value) => value.trim() !== "",
  );

  const handleChange =
    (setValue: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) =>
      setValue(toNumericValue(event.target.value));

  // 저장 시에만 전역 값 갱신
  const handleSave = () => {
    setPrivateInfo({ assets, monthlyIncome, monthlyExpense, serviceYears, monthlyPension });
  };

  return {
    // 금액 항목은 콤마 표기, 저장에는 숫자만 사용
    assets: toDisplayValue(assets),
    monthlyIncome: toDisplayValue(monthlyIncome),
    monthlyExpense: toDisplayValue(monthlyExpense),
    serviceYears,
    monthlyPension: toDisplayValue(monthlyPension),
    isSubmittable,
    handleAssetsChange: handleChange(setAssets),
    handleMonthlyIncomeChange: handleChange(setMonthlyIncome),
    handleMonthlyExpenseChange: handleChange(setMonthlyExpense),
    handleServiceYearsChange: handleChange(setServiceYears),
    handleMonthlyPensionChange: handleChange(setMonthlyPension),
    handleSave,
  };
}
