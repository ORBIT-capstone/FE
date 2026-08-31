import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "@/api/user/userApi";
import { useAuthStore } from "@/stores/authStore";

export default function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => deleteMe(),
    // 탈퇴 후 인증 정보와 서버 캐시 정리
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}
