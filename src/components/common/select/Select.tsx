import type { ComponentPropsWithoutRef } from "react";
import ChevronIcon from "@/components/common/icon/ChevronIcon";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  options: SelectOption[];
  // 폭 지정용, 부모에서 넘기면 기본 폭 대체
  className?: string;
}

export default function Select({ options, className = "w-full", ...rest }: SelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        className="h-14 w-full cursor-pointer appearance-none rounded-xl bg-field pr-10 pl-4 text-base text-bg-base outline-none"
        {...rest}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-bg-base" />
    </div>
  );
}
