import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  // 크기 지정용, 부모에서 넘기면 기본 크기 대체
  className?: string;
}

export default function Button({
  children,
  className = "h-14 w-full",
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
      className={`rounded-xl text-base font-bold text-bg-base transition-colors ${className} ${colorClassName}`}
      {...rest}
    >
      {children}
    </button>
  );
}
