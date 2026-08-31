import { useId, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import passwordSeen from "@/assets/icons/passwordSeen.svg";
import passwordUnseen from "@/assets/icons/passwordUnseen.svg";

export type InputVariant = "light" | "dark";

// 배경·테두리·글자색 묶음
const VARIANT_CLASS: Record<InputVariant, string> = {
  light: "bg-field text-bg-base placeholder:text-neutral-400",
  dark: "border border-muted bg-field-dark text-white placeholder:text-muted",
};

const UNIT_CLASS: Record<InputVariant, string> = {
  light: "text-bg-base",
  dark: "text-muted",
};

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  // 비밀번호 표시 토글 사용 여부
  isPassword?: boolean;
  // 인풋 좌측 아이콘 슬롯
  leftIcon?: ReactNode;
  // 인풋 우측 단위 표기
  unit?: string;
  variant?: InputVariant;
  // 폭 지정용, 부모에서 넘기면 기본 폭 대체
  className?: string;
}

export default function Input({
  label,
  isPassword = false,
  leftIcon,
  unit,
  variant = "light",
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
          className={`h-14 w-full rounded-xl px-4 text-base outline-none read-only:cursor-pointer ${
            VARIANT_CLASS[variant]
          } ${isPassword ? "pr-14" : ""} ${unit ? "pr-12" : ""} ${leftIcon ? "pl-14" : ""}`}
          {...rest}
        />

        {unit && (
          <span
            className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-base ${UNIT_CLASS[variant]}`}
          >
            {unit}
          </span>
        )}

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
