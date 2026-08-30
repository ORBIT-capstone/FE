import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MONTHLY_PENSION } from "@/mocks/reemployment";
import { useProfileStore } from "@/stores/profileStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import { calculateAge } from "@/utils/age";
import { calculateReemployment } from "@/utils/reemployment";

const MAN_WON = 10_000;

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

export default function useReemploymentForm() {
  const navigate = useNavigate();
  const profile = useProfileStore((state) => state.profile);
  const privateInfo = useProfileStore((state) => state.privateInfo);
  const setReemployment = useReemploymentStore((state) => state.setReemployment);

  // 재취업 월 소득, 만원 단위
  const [monthlyIncome, setMonthlyIncome] = useState("");

  // 마이페이지 저장값 기반 내 정보, 금액은 원 단위
  const baseInfo = {
    currentAge: calculateAge(profile.birthDate),
    assets: Number(privateInfo.assets),
    monthlyExpense: Number(privateInfo.monthlyExpense),
    monthlyPension: MOCK_MONTHLY_PENSION,
  };

  const isSubmittable = monthlyIncome !== "" && Number(monthlyIncome) > 0;

  const handleMonthlyIncomeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMonthlyIncome(toNumericValue(event.target.value));

  // 감액 계산 후 결과 화면 이동 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    const input = {
      currentAge: String(baseInfo.currentAge),
      monthlyExpense: String(baseInfo.monthlyExpense / MAN_WON),
      monthlyPension: String(baseInfo.monthlyPension / MAN_WON),
      assets: String(baseInfo.assets / MAN_WON),
      monthlyIncome,
      gender: profile.gender,
    };

    setReemployment(input, calculateReemployment(input));
    navigate("/reemployment/result");
  };

  return {
    baseInfo,
    monthlyIncome,
    isSubmittable,
    handleMonthlyIncomeChange,
    handleSubmit,
    handleEditClick: () => navigate("/mypage/private-info"),
  };
}
