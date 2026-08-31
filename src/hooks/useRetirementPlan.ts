import { useDiagnosisStore } from "@/stores/diagnosisStore";
import { useProfileStore } from "@/stores/profileStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import type { RetirementPlanBase } from "@/utils/retirementPlan";
import { calculateRetirementPlan } from "@/utils/retirementPlan";

const MAN_WON = 10_000;

export default function useRetirementPlan() {
  const diagnosisInput = useDiagnosisStore((state) => state.input);
  const diagnosisResult = useDiagnosisStore((state) => state.result);
  const reemploymentResult = useReemploymentStore((state) => state.result);
  const privateInfo = useProfileStore((state) => state.privateInfo);

  // 최신 진단 우선, 재취업 감액 결과가 없으면 은퇴 자산 진단 결과 사용
  let base: RetirementPlanBase | null = null;

  if (reemploymentResult) {
    base = {
      currentAge: reemploymentResult.current_age,
      targetAge: reemploymentResult.target_age,
      assets: Number(privateInfo.assets) / MAN_WON,
      monthlyExpense: Number(privateInfo.monthlyExpense) / MAN_WON,
      monthlyIncome: reemploymentResult.reduced_monthly_pension / MAN_WON,
    };
  } else if (diagnosisInput && diagnosisResult) {
    base = {
      currentAge: diagnosisResult.current_age,
      targetAge: diagnosisResult.target_age,
      assets: Number(diagnosisInput.assets) / MAN_WON,
      monthlyExpense: Number(diagnosisInput.monthlyExpense) / MAN_WON,
      monthlyIncome: Number(diagnosisInput.monthlyPension) / MAN_WON,
    };
  }

  return { plan: base ? calculateRetirementPlan(base) : null };
}
