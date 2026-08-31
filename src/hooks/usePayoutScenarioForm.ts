import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/apiError";
import usePrivateInfo from "@/hooks/usePrivateInfo";
import usePayoutScenarioMutation from "@/queries/payoutScenario/usePayoutScenarioMutation";
import { useAuthStore } from "@/stores/authStore";
import { usePayoutScenarioStore } from "@/stores/payoutScenarioStore";
import { calculateAge } from "@/utils/age";

// 시나리오 비교 가능 최소 근속연수
const MIN_SERVICE_YEARS = 10;

export default function usePayoutScenarioForm() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { privateInfo } = usePrivateInfo();
  const earlyYears = usePayoutScenarioStore((state) => state.earlyYears);
  const setEarlyYears = usePayoutScenarioStore((state) => state.setEarlyYears);
  const setResult = usePayoutScenarioStore((state) => state.setResult);
  const { mutate: compareMutate, isPending } = usePayoutScenarioMutation();

  const [errorMessage, setErrorMessage] = useState("");

  // 마이페이지 저장값 기반 내 정보
  const baseInfo = {
    currentAge: calculateAge(user?.birthDate ?? ""),
    gender: user?.gender ?? "female",
    assets: Number(privateInfo.assets),
    monthlyExpense: Number(privateInfo.monthlyExpense),
    monthlyIncome: Number(privateInfo.monthlyIncome),
    serviceYears: Number(privateInfo.serviceYears),
  };

  // 요청 전 입력값 제약 확인
  const getValidationMessage = () => {
    if (baseInfo.currentAge < 1) return "프로필에서 생년월일을 먼저 등록해주세요";
    if (baseInfo.monthlyIncome <= 0) return "마이페이지에서 월 소득을 먼저 등록해주세요";
    if (baseInfo.monthlyExpense <= 0) return "마이페이지에서 월 지출액을 먼저 등록해주세요";
    if (baseInfo.serviceYears < MIN_SERVICE_YEARS) {
      return `근속연수가 ${MIN_SERVICE_YEARS}년 이상이어야 시나리오를 비교할 수 있습니다`;
    }

    return "";
  };

  const validationMessage = getValidationMessage();
  const isSubmittable = validationMessage === "" && !isPending;

  // 시나리오 비교 요청 처리
  const handleSubmit = () => {
    if (!isSubmittable) return;

    compareMutate(
      {
        // 현재 나이 매핑
        current_age: baseInfo.currentAge,
        // 월 생활비 매핑, 원 단위
        monthly_expenses: baseInfo.monthlyExpense,
        // 보유 자산 매핑, 원 단위
        asset: baseInfo.assets,
        gender: baseInfo.gender,
        // 기준 월 소득 매핑, 원 단위
        base_monthly_income: baseInfo.monthlyIncome,
        // 총 근속연수 매핑
        total_service_years: baseInfo.serviceYears,
        // 조기수령 연수 매핑
        early_years: earlyYears,
      },
      {
        onSuccess: (result) => {
          setResult(result);
          navigate("/payout-scenario/result");
        },
        onError: (error) =>
          setErrorMessage(getApiErrorMessage(error, "시나리오 비교에 실패했습니다")),
      },
    );
  };

  return {
    baseInfo,
    earlyYears,
    isPending,
    isSubmittable,
    // 제약 안내 문구가 있으면 우선 노출
    errorMessage: validationMessage || errorMessage,
    setEarlyYears,
    handleSubmit,
    handleEditClick: () => navigate("/mypage/private-info"),
  };
}
