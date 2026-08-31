import { useState } from "react";
import type { ChangeEvent } from "react";
import { getApiErrorMessage } from "@/api/apiError";
import useUpdateMeMutation from "@/queries/auth/useUpdateMeMutation";
import { useAuthStore } from "@/stores/authStore";
import type { Gender } from "@/types/auth";
import { toApiGender } from "@/types/auth";

export default function useProfileEditForm() {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateMeMutate, isPending } = useUpdateMeMutation();

  // 기존 회원 정보로 초기화
  const [name, setName] = useState(user?.name ?? "");
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? "");
  const [gender, setGender] = useState<Gender>(user?.gender ?? "female");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmittable = name.trim() !== "" && birthDate.trim() !== "" && !isPending;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  // 회원 정보 수정 요청 처리
  const handleSave = (onSuccess: () => void) => {
    if (!isSubmittable) return;

    updateMeMutate(
      { name, birthDate, gender: toApiGender(gender) },
      {
        onSuccess,
        onError: (error) =>
          setErrorMessage(getApiErrorMessage(error, "회원 정보 수정에 실패했습니다")),
      },
    );
  };

  return {
    name,
    birthDate,
    gender,
    isSubmittable,
    isPending,
    errorMessage,
    handleNameChange,
    setBirthDate,
    setGender,
    handleSave,
  };
}
