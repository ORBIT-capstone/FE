import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { getApiErrorMessage } from "@/api/apiError";
import useMeQuery from "@/queries/user/useMeQuery";
import useUpdateMeMutation from "@/queries/user/useUpdateMeMutation";
import { useAuthStore } from "@/stores/authStore";
import type { Gender } from "@/types/auth";
import { toApiGender, toGender } from "@/types/auth";

export default function useProfileEditForm() {
  const user = useAuthStore((state) => state.user);
  const { data: me, isLoading } = useMeQuery();
  const { mutate: updateMeMutate, isPending } = useUpdateMeMutation();

  const [name, setName] = useState(user?.name ?? "");
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? "");
  const [gender, setGender] = useState<Gender>(user?.gender ?? "female");
  const [errorMessage, setErrorMessage] = useState("");

  const isInitializedRef = useRef(false);

  // 조회한 회원 정보로 기존 값 채움
  useEffect(() => {
    if (!me || isInitializedRef.current) return;

    isInitializedRef.current = true;
    setName(me.name);
    setBirthDate(me.birthDate);
    setGender(toGender(me.gender));
  }, [me]);

  const isSubmittable = name.trim() !== "" && birthDate.trim() !== "" && !isPending && !isLoading;

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
