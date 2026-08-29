import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "default" | "pill";

// 형태별 크기·모서리 값
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default: "h-14 w-full rounded-xl text-base",
  pill: "h-10 rounded-full px-6 text-sm",
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: ButtonVariant;
  // 여백 등 추가 클래스
  className?: string;
}

export default function Button({
  children,
  variant = "default",
  className = "",
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) {
  // 입력 완료 여부에 따른 색상 분기
  const colorClassName = disabled
    ? "bg-btn-disabled cursor-not-allowed"
    : "bg-btn-active hover:bg-btn-pressed active:bg-btn-pressed cursor-pointer";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold text-bg-base transition-colors ${VARIANT_CLASS[variant]} ${colorClassName} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
