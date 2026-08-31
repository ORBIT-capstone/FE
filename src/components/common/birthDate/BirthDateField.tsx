import { useEffect, useRef, useState } from "react";
import calenderIcon from "@/assets/icons/calenderIcon.svg";
import Calendar from "@/components/common/calendar/Calendar";
import Input from "@/components/common/input/Input";
import type { InputVariant } from "@/components/common/input/Input";

interface BirthDateFieldProps {
  value: string;
  onChange: (date: string) => void;
  variant?: InputVariant;
}

export default function BirthDateField({
  value,
  onChange,
  variant = "light",
}: BirthDateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 달력 바깥 클릭 시 닫기 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <Input
        label="생년월일"
        placeholder="yyyy-mm-dd"
        value={value}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        variant={variant}
        leftIcon={
          <img src={calenderIcon} alt="" className={`w-6 ${variant === "dark" ? "invert" : ""}`} />
        }
      />

      {isOpen && (
        <Calendar
          value={value}
          onSelect={(date) => {
            onChange(date);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
