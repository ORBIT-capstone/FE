import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function useSignupForm() {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 전체 필드 입력 여부
  const isFilled = [name, emailId, emailDomain, birthDate, password, passwordConfirm].every(
    (value) => value.trim() !== "",
  );

  const isPasswordMatched = password === passwordConfirm;
  const isSubmittable = isFilled && isPasswordMatched;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const handleEmailIdChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmailId(event.target.value);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirm(event.target.value);

  // 회원가입 요청 처리, 추후 tanstack-query mutation 연결 지점
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmittable) return;
  };

  return {
    name,
    emailId,
    emailDomain,
    birthDate,
    password,
    passwordConfirm,
    isSubmittable,
    isPasswordMatched,
    handleNameChange,
    handleEmailIdChange,
    setEmailDomain,
    setBirthDate,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
  };
}
