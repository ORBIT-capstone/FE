import { useEffect, useRef, useState } from "react";
import { getApiErrorMessage } from "@/api/apiError";
import useRecommendationsMutation from "@/queries/retirementPlan/useRecommendationsMutation";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { calculateAge } from "@/utils/age";

export default function useRetirementPlan() {
  const user = useAuthStore((state) => state.user);
  const privateInfo = useProfileStore((state) => state.privateInfo);
  const { mutate: recommendMutate, data: plan, isPending } = useRecommendationsMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const requestedRef = useRef(false);

  // 마이페이지 저장값 기반 요청 데이터
  const baseInfo = {
    currentAge: calculateAge(user?.birthDate ?? ""),
    gender: user?.gender ?? "female",
    assets: Number(privateInfo.assets),
    monthlyExpense: Number(privateInfo.monthlyExpense),
    monthlyPension: Number(privateInfo.monthlyPension),
  };

  const hasRequiredInfo = baseInfo.currentAge > 0 && baseInfo.monthlyExpense > 0;

  // 진입 시 한 번만 추천 요청
  useEffect(() => {
    if (!hasRequiredInfo || requestedRef.current) return;

    requestedRef.current = true;

    recommendMutate(
      {
        // 현재 나이 매핑
        current_age: baseInfo.currentAge,
        // 월 생활비 매핑, 원 단위
        monthly_expenses: baseInfo.monthlyExpense,
        // 월 연금 매핑, 원 단위
        monthly_pension: baseInfo.monthlyPension,
        // 보유 자산 매핑, 원 단위
        asset: baseInfo.assets,
        gender: baseInfo.gender,
      },
      {
        onError: (error) =>
          setErrorMessage(getApiErrorMessage(error, "추천을 불러오지 못했습니다")),
      },
    );
  });

  return { plan, baseInfo, hasRequiredInfo, isPending, errorMessage };
}
