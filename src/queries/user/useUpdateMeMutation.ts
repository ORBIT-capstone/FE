import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/api/user/userApi";
import { ME_KEY } from "@/queries/user/useMeQuery";
import { useAuthStore } from "@/stores/authStore";
import type { UpdateUserRequest } from "@/types/user";
import { toAuthUser } from "@/types/user";

// 회원 정보 부분 수정 요청
export default function useUpdateMeMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (request: UpdateUserRequest) => updateMe(request),
    onSuccess: (user) => {
      // 응답 본문이 있으면 회원 정보 즉시 반영
      if (user?.email) setUser(toAuthUser(user));

      queryClient.invalidateQueries({ queryKey: ME_KEY });
    },
  });
}
