import { useQuery } from "@tanstack/react-query";
import { getDiagnoses } from "@/api/diagnoses/diagnosesApi";
import { DIAGNOSIS_KEYS } from "@/queries/diagnoses/diagnosisKeys";
import { useAuthStore } from "@/stores/authStore";

// 저장된 진단 목록 조회
export default function useDiagnosisListQuery() {
  const isLoggedIn = useAuthStore((state) => state.user) !== null;

  return useQuery({
    queryKey: DIAGNOSIS_KEYS.list(),
    queryFn: getDiagnoses,
    enabled: isLoggedIn,
  });
}
