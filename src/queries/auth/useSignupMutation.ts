import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth/authApi";
import type { SignupRequest } from "@/types/auth";

export default function useSignupMutation() {
  return useMutation({
    mutationFn: (request: SignupRequest) => signup(request),
  });
}
