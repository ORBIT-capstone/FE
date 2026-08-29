import { useId, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import passwordSeen from "@/assets/icons/passwordSeen.svg";
import passwordUnseen from "@/assets/icons/passwordUnseen.svg";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  // 비밀번호 표시 토글 사용 여부
  isPassword?: boolean;
  // 인풋 좌측 아이콘 슬롯
  leftIcon?: ReactNode;
  // 폭 지정용, 부모에서 넘기면 기본 폭 대체
  className?: string;
}

export default function Input({
  label,
  isPassword = false,
  leftIcon,
  className = "w-full",
  id,
  type = "text",
  ...rest
}: InputProps) {
  // 비밀번호 표시 여부, 초기값은 미표시
  const [isSeen, setIsSeen] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const inputType = isPassword ? (isSeen ? "text" : "password") : type;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-base font-medium text-white">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={inputType}
          className={`h-14 w-full rounded-xl bg-field px-4 text-base text-bg-base outline-none read-only:cursor-pointer placeholder:text-neutral-400 ${
            isPassword ? "pr-14" : ""
          } ${leftIcon ? "pl-14" : ""}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsSeen((prev) => !prev)}
            aria-label={isSeen ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
          >
            <img src={isSeen ? passwordSeen : passwordUnseen} alt="" className="w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
