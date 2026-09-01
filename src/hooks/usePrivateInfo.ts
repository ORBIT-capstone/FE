import useMeQuery from "@/queries/user/useMeQuery";

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

// 회원 정보 기반 개인정보
export default function usePrivateInfo() {
  const { data: me, isLoading } = useMeQuery();

  const privateInfo: PrivateInfo = {
    assets: toInputValue(me?.asset),
    monthlyExpense: toInputValue(me?.monthlyExpenses),
    monthlyIncome: toInputValue(me?.monthlyIncome),
    serviceYears: toInputValue(me?.currentYears),
    monthlyPension: toInputValue(me?.monthlyPension),
  };

  return { privateInfo, isLoading };
}
