import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth/authApi";
import { useAuthStore } from "@/stores/authStore";

export default function useLogoutMutation() {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => logout({ refreshToken: refreshToken ?? "" }),
    // 실패해도 로컬 인증 정보는 정리
    onSettled: () => clearAuth(),
  });
}
