import { useMutation } from "@tanstack/react-query";
import { comparePayoutScenarios } from "@/api/payoutScenario/payoutScenarioApi";
import type { PayoutScenarioRequest } from "@/types/payoutScenario";

export default function usePayoutScenarioMutation() {
  return useMutation({
    mutationFn: (request: PayoutScenarioRequest) => comparePayoutScenarios(request),
  });
}
