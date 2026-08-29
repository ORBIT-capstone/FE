import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "default" | "pill";
export type ButtonTone = "primary" | "secondary";

// 형태별 크기·모서리 값
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default: "h-14 w-full rounded-xl text-base",
  pill: "h-10 rounded-full px-6 text-sm",
};

// 색상 계열
const TONE_CLASS: Record<ButtonTone, string> = {
  primary: "bg-btn-active text-bg-base hover:bg-btn-pressed active:bg-btn-pressed",
  secondary: "border border-muted bg-card text-white hover:bg-back-bg active:bg-back-bg",
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  // 여백 등 추가 클래스
  className?: string;
}

export default function Button({
  children,
  variant = "default",
  tone = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) {
  // 입력 완료 여부에 따른 색상 분기
  const colorClassName = disabled
    ? "bg-btn-disabled text-bg-base cursor-not-allowed"
    : `cursor-pointer ${TONE_CLASS[tone]}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold transition-colors ${VARIANT_CLASS[variant]} ${colorClassName} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
