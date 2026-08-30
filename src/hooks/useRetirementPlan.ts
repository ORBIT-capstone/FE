import { useDiagnosisStore } from "@/stores/diagnosisStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";
import type { RetirementPlanBase } from "@/utils/retirementPlan";
import { calculateRetirementPlan } from "@/utils/retirementPlan";

const MAN_WON = 10_000;

export default function useRetirementPlan() {
  const diagnosisInput = useDiagnosisStore((state) => state.input);
  const diagnosisResult = useDiagnosisStore((state) => state.result);
  const reemploymentInput = useReemploymentStore((state) => state.input);
  const reemploymentResult = useReemploymentStore((state) => state.result);

  // 최신 진단 우선, 재취업 감액 결과가 없으면 은퇴 자산 진단 결과 사용
  let base: RetirementPlanBase | null = null;

  if (reemploymentInput && reemploymentResult) {
    base = {
      currentAge: reemploymentResult.current_age,
      targetAge: reemploymentResult.target_age,
      assets: Number(reemploymentInput.assets),
      monthlyExpense: Number(reemploymentInput.monthlyExpense),
      monthlyIncome: reemploymentResult.reduced_monthly_pension / MAN_WON,
    };
  } else if (diagnosisInput && diagnosisResult) {
    base = {
      currentAge: Number(diagnosisInput.currentAge),
      targetAge: diagnosisResult.lifeExpectancy,
      assets: Number(diagnosisInput.assets),
      monthlyExpense: Number(diagnosisInput.monthlyExpense),
      monthlyIncome: Number(diagnosisInput.monthlyPension),
    };
  }

  return { plan: base ? calculateRetirementPlan(base) : null };
}
