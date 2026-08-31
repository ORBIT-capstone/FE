import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/api/auth/authApi";
import { useAuthStore } from "@/stores/authStore";

export default function useDeleteAccountMutation() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => clearAuth(),
  });
}
