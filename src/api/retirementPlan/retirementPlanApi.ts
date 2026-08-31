import { fastApiInstance } from "@/api/fastApiInstance";
import type { RecommendationRequest, RecommendationResponse } from "@/types/retirementPlan";

export const recommendRetirementPlan = async (request: RecommendationRequest) => {
  const { data } = await fastApiInstance.post<RecommendationResponse>(
    "/api/retirement/recommendations",
    request,
  );

  return data;
};
