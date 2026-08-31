import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/api/auth/authError";
import useSignupMutation from "@/queries/auth/useSignupMutation";
import type { Gender } from "@/types/auth";
import { toApiGender } from "@/types/auth";

export default function useSignupForm() {
  const navigate = useNavigate();
  const { mutate: signupMutate, isPending } = useSignupMutation();

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [gender, setGender] = useState<Gender>("female");

  // 회원가입 실패 안내 문구
  const [errorMessage, setErrorMessage] = useState("");

  // 전체 필드 입력 여부
  const isFilled = [name, emailId, emailDomain, birthDate, password, passwordConfirm].every(
    (value) => value.trim() !== "",
  );

  const isPasswordMatched = password === passwordConfirm;
  const isSubmittable = isFilled && isPasswordMatched && !isPending;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const handleEmailIdChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmailId(event.target.value);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirm(event.target.value);

  // 회원가입 요청 처리
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmittable) return;

    signupMutate(
      {
        email: `${emailId}@${emailDomain}`,
        password,
        name,
        birthDate,
        gender: toApiGender(gender),
      },
      {
        onSuccess: () => navigate("/login"),
        onError: (error) => setErrorMessage(getApiErrorMessage(error, "회원가입에 실패했습니다")),
      },
    );
  };

  return {
    name,
    emailId,
    emailDomain,
    birthDate,
    password,
    passwordConfirm,
    gender,
    isSubmittable,
    isPending,
    isPasswordMatched,
    errorMessage,
    handleNameChange,
    handleEmailIdChange,
    setEmailDomain,
    setBirthDate,
    setGender,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
  };
}
