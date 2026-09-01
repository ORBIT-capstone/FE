import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth/authApi";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  return useMutation({
    mutationFn: () => logout({ refreshToken: refreshToken ?? "" }),
    // 실패해도 로컬 정보와 서버 캐시는 정리, 계정 전환 시 이전 값 잔존 방지
    onSettled: () => {
      clearAuth();
      clearProfile();
      queryClient.clear();
    },
  });
}
