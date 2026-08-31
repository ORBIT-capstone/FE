import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/api/auth/authApi";
import { getMe } from "@/api/user/userApi";
import { ME_KEY } from "@/queries/user/useMeQuery";
import { useAuthStore } from "@/stores/authStore";
import type { LoginRequest } from "@/types/auth";
import { toAuthUser } from "@/types/user";

export default function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setTokens = useAuthStore((state) => state.setTokens);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: async (request: LoginRequest) => {
      const tokens = await login(request);

      // 회원 정보 조회에 필요한 토큰 선반영
      setTokens(tokens.accessToken, tokens.refreshToken);

      return { tokens, user: await getMe() };
    },
    // 로그인 성공 후 인증 정보 저장 처리
    onSuccess: ({ tokens, user }) => {
      setAuth(toAuthUser(user), tokens.accessToken, tokens.refreshToken);
      queryClient.setQueryData(ME_KEY, user);
    },
    onError: () => clearAuth(),
  });
}
