import { fastApiInstance } from "@/api/fastApiInstance";
import type { RetirementDiagnosisRequest, RetirementDiagnosisResponse } from "@/types/diagnosis";

export const diagnoseRetirement = async (request: RetirementDiagnosisRequest) => {
  const { data } = await fastApiInstance.post<RetirementDiagnosisResponse>(
    "/api/retirement/diagnosis",
    request,
  );

  return data;
};
