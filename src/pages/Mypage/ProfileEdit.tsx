import { useNavigate } from "react-router-dom";
import BirthDateField from "@/components/common/birthDate/BirthDateField";
import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/header/PageHeader";
import Input from "@/components/common/input/Input";
import GenderSelect from "@/components/common/gender/GenderSelect";
import useProfileEditForm from "@/hooks/useProfileEditForm";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const {
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
  } = useProfileEditForm();

  // 저장 성공 시 마이페이지 복귀 처리
  const handleSubmit = () => handleSave(() => navigate("/mypage"));

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="프로필 수정하기" />

        <div className="mt-8 flex flex-col gap-6">
          <Input
            label="이름"
            variant="dark"
            value={name}
            onChange={handleNameChange}
            placeholder="이름"
          />

          <BirthDateField value={birthDate} onChange={setBirthDate} variant="dark" />

          <GenderSelect value={gender} onChange={setGender} />
        </div>

        {errorMessage && <p className="mt-6 text-sm text-btn-active">{errorMessage}</p>}

        <Button onClick={handleSubmit} disabled={!isSubmittable} className="mt-auto">
          {isPending ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </div>
  );
}
