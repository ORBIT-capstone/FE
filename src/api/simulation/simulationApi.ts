import { fastApiInstance } from "@/api/fastApiInstance";
import type { EmployeeSimulateRequest, EmployeeSimulateResponse } from "@/types/simulation";

export const simulateEmployeePension = async (request: EmployeeSimulateRequest) => {
  const { data } = await fastApiInstance.post<EmployeeSimulateResponse>(
    "/api/employees/simulate",
    request,
  );

  return data;
};
