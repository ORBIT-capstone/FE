import { fastApiInstance } from "@/api/fastApiInstance";
import type { ReductionRequest, ReductionResponse } from "@/types/reemployment";

export const calculateReduction = async (request: ReductionRequest) => {
  const { data } = await fastApiInstance.post<ReductionResponse>(
    "/api/retirement/reduction",
    request,
  );

  return data;
};
