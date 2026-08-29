import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Gender } from "@/stores/profileStore";
import { useProfileStore } from "@/stores/profileStore";

export default function useProfileEditForm() {
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);

  // 기존 프로필 값으로 초기화
  const [name, setName] = useState(profile.name);
  const [birthDate, setBirthDate] = useState(profile.birthDate);
  const [gender, setGender] = useState<Gender>(profile.gender);

  const isSubmittable = name.trim() !== "" && birthDate.trim() !== "";

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  // 저장 시에만 전역 값 갱신
  const handleSave = () => {
    setProfile({ ...profile, name, birthDate, gender });
  };

  return {
    name,
    birthDate,
    gender,
    isSubmittable,
    handleNameChange,
    setBirthDate,
    setGender,
    handleSave,
  };
}
