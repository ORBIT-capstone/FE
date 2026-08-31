import { useMutation } from "@tanstack/react-query";
import { recommendRetirementPlan } from "@/api/retirementPlan/retirementPlanApi";
import type { RecommendationRequest } from "@/types/retirementPlan";

export default function useRecommendationsMutation() {
  return useMutation({
    mutationFn: (request: RecommendationRequest) => recommendRetirementPlan(request),
  });
}
