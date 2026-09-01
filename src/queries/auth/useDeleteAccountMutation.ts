import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "@/api/user/userApi";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

export default function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  return useMutation({
    mutationFn: () => deleteMe(),
    // 탈퇴 후 로컬 정보와 서버 캐시 정리
    onSuccess: () => {
      clearAuth();
      clearProfile();
      queryClient.clear();
    },
  });
}
