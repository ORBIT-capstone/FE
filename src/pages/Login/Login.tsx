import { Link } from "react-router-dom";
import Button from "@/components/common/button/Button";
import Loading from "@/components/common/Loading";
import Input from "@/components/common/input/Input";
import Modal from "@/components/common/modal/Modal";
import useLoginForm from "@/hooks/useLoginForm";

// 로그인 실패 안내 문구
const INVALID_MESSAGE =
  "로그인 정보를 확인해 주세요\n이메일 또는 비밀번호가 올바르지 않습니다.\n다시 입력해 주세요";
const NOT_FOUND_MESSAGE = "일치하는 회원정보가 없습니다\n회원가입을 하시겠습니까?";

export default function Login() {
  const {
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
    closeLoginError,
    goSignup,
  } = useLoginForm();

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-12 pb-32">
        <h1 className="pt-48 text-center text-4xl font-extrabold tracking-wide text-title">
          LOGIN
        </h1>

        <form onSubmit={handleSubmit} className="mt-14 flex flex-col gap-4">
          <Input
            label="이메일 / email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하시오"
            autoComplete="email"
          />

          <Input
            label="비밀번호 / Password"
            isPassword
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하시오"
            autoComplete="current-password"
          />

          <label className="flex cursor-pointer items-center justify-end gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="size-6 cursor-pointer appearance-none rounded-sm bg-white checked:bg-btn-active"
            />
            <span className="text-base text-white">Remember me</span>
          </label>

          <Button type="submit" disabled={!isFilled || isPending} className="mt-1">
            {isPending ? "로그인 중..." : "로그인 하기"}
          </Button>
        </form>

        <div className="mt-auto flex items-center justify-center gap-3 text-base text-white">
          <Link to="/signup" className="hover:underline">
            회원가입
          </Link>
          <span className="text-neutral-400">|</span>
          <Link to="/find-account" className="hover:underline">
            계정찾기
          </Link>
        </div>
      </div>

      <Modal
        isOpen={loginErrorType === "invalid"}
        message={INVALID_MESSAGE}
        confirmLabel="확인"
        variant="single"
        onCancel={closeLoginError}
        onConfirm={closeLoginError}
      />

      <Modal
        isOpen={loginErrorType === "notFound"}
        message={NOT_FOUND_MESSAGE}
        confirmLabel="회원가입하기"
        onCancel={closeLoginError}
        onConfirm={goSignup}
      />
      {isPending && <Loading variant="overlay" message="로그인 중입니다" />}
    </div>
  );
}
