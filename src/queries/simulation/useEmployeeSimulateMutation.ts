import { useMutation } from "@tanstack/react-query";
import { simulateEmployeePension } from "@/api/simulation/simulationApi";
import type { EmployeeSimulateRequest } from "@/types/simulation";

export default function useEmployeeSimulateMutation() {
  return useMutation({
    mutationFn: (request: EmployeeSimulateRequest) => simulateEmployeePension(request),
  });
}
