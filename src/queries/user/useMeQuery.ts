import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/user/userApi";
import { useAuthStore } from "@/stores/authStore";

export const ME_KEY = ["me"] as const;

// 로그인 회원 정보 조회
export default function useMeQuery() {
  const isLoggedIn = useAuthStore((state) => state.user) !== null;

  return useQuery({
    queryKey: ME_KEY,
    queryFn: getMe,
    enabled: isLoggedIn,
  });
}
