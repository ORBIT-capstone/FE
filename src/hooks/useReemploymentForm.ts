import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import useReductionMutation from "@/queries/reemployment/useReductionMutation";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import { calculateAge } from "@/utils/age";
import { formatNumber } from "@/utils/format";

// 숫자 외 문자 제거 처리
const toNumericValue = (value: string) => value.replace(/[^0-9]/g, "");

export default function useReemploymentForm() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const privateInfo = useProfileStore((state) => state.privateInfo);
  const setReemployment = useReemploymentStore((state) => state.setReemployment);
  const { mutate: reductionMutate, isPending } = useReductionMutation();

  // 재취업 월 소득, 원 단위
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 마이페이지 저장값 기반 내 정보
  const baseInfo = {
    currentAge: calculateAge(user?.birthDate ?? ""),
    gender: user?.gender ?? "female",
    assets: Number(privateInfo.assets),
    monthlyExpense: Number(privateInfo.monthlyExpense),
    monthlyPension: Number(privateInfo.monthlyPension),
  };

  const isSubmittable = monthlyIncome !== "" && !isPending;

  const handleMonthlyIncomeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMonthlyIncome(toNumericValue(event.target.value));

  // 감액 계산 요청 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    reductionMutate(
      {
        // 현재 나이 매핑
        current_age: baseInfo.currentAge,
        // 월 생활비 매핑, 원 단위
        monthly_expenses: baseInfo.monthlyExpense,
        // 기존 월 연금 매핑, 원 단위
        monthly_pension: baseInfo.monthlyPension,
        // 보유 자산 매핑, 원 단위
        asset: baseInfo.assets,
        gender: baseInfo.gender,
        // 재취업 소득 매핑, 원 단위
        reemployment_income: Number(monthlyIncome),
      },
      {
        onSuccess: (result) => {
          setReemployment({ monthlyIncome }, result);
          navigate("/reemployment/result");
        },
        onError: (error) => setErrorMessage(getApiErrorMessage(error, "감액 계산에 실패했습니다")),
      },
    );
  };

  return {
    baseInfo,
    // 천 단위 콤마 표기값, 요청에는 숫자만 사용
    monthlyIncome: monthlyIncome === "" ? "" : formatNumber(Number(monthlyIncome)),
    isSubmittable,
    isPending,
    errorMessage,
    handleMonthlyIncomeChange,
    handleSubmit,
    handleEditClick: () => navigate("/mypage/private-info"),
  };
}
