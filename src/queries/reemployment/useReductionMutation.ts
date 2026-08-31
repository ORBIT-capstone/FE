import { useMutation } from "@tanstack/react-query";
import { calculateReduction } from "@/api/reemployment/reemploymentApi";
import type { ReductionRequest } from "@/types/reemployment";

export default function useReductionMutation() {
  return useMutation({
    mutationFn: (request: ReductionRequest) => calculateReduction(request),
  });
}
