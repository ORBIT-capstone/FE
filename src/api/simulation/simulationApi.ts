import { simulationInstance } from "@/api/simulationInstance";
import type { EmployeeSimulateRequest, EmployeeSimulateResponse } from "@/types/simulation";

export const simulateEmployeePension = async (request: EmployeeSimulateRequest) => {
  const { data } = await simulationInstance.post<EmployeeSimulateResponse>(
    "/api/employees/simulate",
    request,
  );

  return data;
};
