import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginErrorType } from "@/api/auth/authError";
import { getLoginErrorType } from "@/api/auth/authError";
import useLoginMutation from "@/queries/auth/useLoginMutation";
import { useAuthStore } from "@/stores/authStore";

export default function useLoginForm() {
  const navigate = useNavigate();
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);
  const { mutate: loginMutate, isPending } = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 실패 유형, 팝업 분기용
  const [loginErrorType, setLoginErrorType] = useState<LoginErrorType | null>(null);

  // 이메일·비밀번호 모두 입력 여부
  const isFilled = email.trim() !== "" && password.trim() !== "";

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setRememberMe(event.target.checked);

  // 로그인 요청 처리
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFilled || isPending) return;

    loginMutate(
      { email, password },
      {
        onSuccess: () => navigate("/"),
        onError: (error) => setLoginErrorType(getLoginErrorType(error)),
      },
    );
  };

  return {
    email,
    password,
    rememberMe,
    isFilled,
    isPending,
    loginErrorType,
    handleEmailChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
    closeLoginError: () => setLoginErrorType(null),
    goSignup: () => navigate("/signup"),
  };
}
