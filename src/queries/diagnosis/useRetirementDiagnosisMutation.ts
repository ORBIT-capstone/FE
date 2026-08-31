import { useMutation } from "@tanstack/react-query";
import { diagnoseRetirement } from "@/api/diagnosis/diagnosisApi";
import type { RetirementDiagnosisRequest } from "@/types/diagnosis";

export default function useRetirementDiagnosisMutation() {
  return useMutation({
    mutationFn: (request: RetirementDiagnosisRequest) => diagnoseRetirement(request),
  });
}
