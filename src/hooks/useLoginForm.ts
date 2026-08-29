import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);

  // 이메일·비밀번호 모두 입력 여부
  const isFilled = email.trim() !== "" && password.trim() !== "";

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setRememberMe(event.target.checked);

  // 로그인 요청 처리, 추후 tanstack-query mutation 연결 지점
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFilled) return;
  };

  return {
    email,
    password,
    rememberMe,
    isFilled,
    handleEmailChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  };
}
