import useMeQuery from "@/queries/user/useMeQuery";
import { useProfileStore } from "@/stores/profileStore";

// 진단·시뮬레이션에 사용하는 개인정보, 금액은 원 단위 문자열
export interface PrivateInfo {
  assets: string;
  monthlyExpense: string;
  monthlyIncome: string;
  serviceYears: string;
  monthlyPension: string;
}

// 미등록 값은 빈 문자열로 변환
const toInputValue = (value?: number | null) =>
  value === null || value === undefined ? "" : String(value);

// 서버 회원 정보와 로컬 월 소득을 합친 개인정보
export default function usePrivateInfo() {
  const { data: me, isLoading } = useMeQuery();
  const monthlyIncome = useProfileStore((state) => state.monthlyIncome);

  const privateInfo: PrivateInfo = {
    assets: toInputValue(me?.asset),
    monthlyExpense: toInputValue(me?.monthlyExpenses),
    monthlyIncome,
    serviceYears: toInputValue(me?.currentYears),
    monthlyPension: toInputValue(me?.monthlyPension),
  };

  return { privateInfo, isLoading };
}
