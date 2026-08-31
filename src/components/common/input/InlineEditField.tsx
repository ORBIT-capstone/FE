import { useEffect, useRef, useState } from "react";
import editIcon from "@/assets/icons/editIcon.svg";

interface InlineEditFieldProps {
  label: string;
  // 원 단위 숫자 문자열
  value: string;
  onChange: (value: string) => void;
  // 보기 상태 표기 변환
  formatValue: (value: string) => string;
  unit?: string;
}

// 페이지 이동 없이 값만 인라인 편집하는 항목
export default function InlineEditField({
  label,
  value,
  onChange,
  formatValue,
  unit,
}: InlineEditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 편집 전환 시 입력에 포커스
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="shrink-0 text-base font-bold text-white">{label}</h2>

      {isEditing ? (
        <div className="flex min-w-0 items-center gap-1">
          <input
            ref={inputRef}
            inputMode="numeric"
            value={value}
            onChange={(event) => onChange(event.target.value.replace(/[^0-9]/g, ""))}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter") setIsEditing(false);
            }}
            className="w-36 min-w-0 rounded-lg border border-btn-active bg-field-dark px-3 py-1 text-right text-base font-bold text-white outline-none"
          />

          {unit && <span className="shrink-0 text-base font-bold text-btn-active">{unit}</span>}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex min-w-0 cursor-pointer items-center gap-2"
        >
          <span className="truncate text-base font-bold text-btn-active">{formatValue(value)}</span>

          <img src={editIcon} alt="수정" className="size-5 shrink-0" />
        </button>
      )}
    </div>
  );
}
