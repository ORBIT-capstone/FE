import { useState } from "react";
import type { ChangeEvent } from "react";
import { useProfileStore } from "@/stores/profileStore";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

export default function usePrivateInfoForm() {
  const privateInfo = useProfileStore((state) => state.privateInfo);
  const setPrivateInfo = useProfileStore((state) => state.setPrivateInfo);

  // 기존 개인정보 값으로 초기화
  const [assets, setAssets] = useState(privateInfo.assets);
  const [monthlyExpense, setMonthlyExpense] = useState(privateInfo.monthlyExpense);
  const [serviceYears, setServiceYears] = useState(privateInfo.serviceYears);

  const isSubmittable = [assets, monthlyExpense, serviceYears].every(
    (value) => value.trim() !== "",
  );

  const handleAssetsChange = (event: ChangeEvent<HTMLInputElement>) =>
    setAssets(toNumericValue(event.target.value));

  const handleMonthlyExpenseChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMonthlyExpense(toNumericValue(event.target.value));

  const handleServiceYearsChange = (event: ChangeEvent<HTMLInputElement>) =>
    setServiceYears(toNumericValue(event.target.value));

  // 저장 시에만 전역 값 갱신
  const handleSave = () => {
    setPrivateInfo({ ...privateInfo, assets, monthlyExpense, serviceYears });
  };

  return {
    assets,
    monthlyExpense,
    serviceYears,
    isSubmittable,
    handleAssetsChange,
    handleMonthlyExpenseChange,
    handleServiceYearsChange,
    handleSave,
  };
}
