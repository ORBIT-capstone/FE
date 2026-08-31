import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import BirthDateField from "@/components/common/birthDate/BirthDateField";
import GenderSelect from "@/components/common/gender/GenderSelect";
import EmailField from "@/components/Signup/EmailField";
import useSignupForm from "@/hooks/useSignupForm";

export default function Signup() {
  const {
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
  } = useSignupForm();

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-12 pb-20">
        <h1 className="pt-36 text-center text-4xl font-extrabold tracking-wide text-title">
          SIGN UP
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <Input
            label="성함/ name"
            value={name}
            onChange={handleNameChange}
            placeholder="성함을 입력하세요 (예 : 홍길동)"
            autoComplete="name"
          />

          <EmailField
            emailId={emailId}
            emailDomain={emailDomain}
            onEmailIdChange={handleEmailIdChange}
            onEmailDomainChange={setEmailDomain}
          />

          <BirthDateField value={birthDate} onChange={setBirthDate} />

          <GenderSelect value={gender} onChange={setGender} variant="light" />

          <Input
            label="비밀번호 / Password"
            isPassword
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하시오"
            autoComplete="new-password"
          />

          <div>
            <Input
              label="비밀번호 재확인"
              isPassword
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              placeholder="비밀번호를 다시 입력하시오"
              autoComplete="new-password"
            />

            {passwordConfirm !== "" && !isPasswordMatched && (
              <p className="mt-2 text-sm text-btn-active">비밀번호가 일치하지 않습니다</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-sm whitespace-pre-line text-btn-active">{errorMessage}</p>
          )}

          <Button type="submit" disabled={!isSubmittable} className="mt-2">
            {isPending ? "가입 중..." : "완료"}
          </Button>
        </form>
      </div>
    </div>
  );
}
