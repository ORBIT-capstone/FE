import { useMutation } from "@tanstack/react-query";
import { updateMe } from "@/api/auth/authApi";
import { useAuthStore } from "@/stores/authStore";
import type { UpdateMeRequest } from "@/types/auth";
import { toAuthUser } from "@/types/auth";

export default function useUpdateMeMutation() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (request: UpdateMeRequest) => updateMe(request),
    // 수정된 회원 정보 갱신
    onSuccess: (user) => setUser(toAuthUser(user)),
  });
}
