import { fastApiInstance } from "@/api/fastApiInstance";
import type { PayoutScenarioRequest, PayoutScenarioResponse } from "@/types/payoutScenario";

export const comparePayoutScenarios = async (request: PayoutScenarioRequest) => {
  const { data } = await fastApiInstance.post<PayoutScenarioResponse>(
    "/api/employees/scenarios",
    request,
  );

  return data;
};
