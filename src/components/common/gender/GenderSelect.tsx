import type { Gender } from "@/types/auth";

export type GenderSelectVariant = "light" | "dark";

const GENDER_ITEMS: { label: string; value: Gender }[] = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

// 배경 계열별 선택·미선택 스타일
const VARIANT_CLASS: Record<GenderSelectVariant, { selected: string; unselected: string }> = {
  light: {
    selected: "border-btn-disabled bg-btn-disabled text-bg-base",
    unselected: "border-field bg-field text-bg-base",
  },
  dark: {
    selected: "border-btn-active bg-btn-active text-bg-base",
    unselected: "border-muted bg-field-dark text-muted",
  },
};

interface GenderSelectProps {
  value: Gender;
  onChange: (gender: Gender) => void;
  variant?: GenderSelectVariant;
}

export default function GenderSelect({ value, onChange, variant = "dark" }: GenderSelectProps) {
  return (
    <div>
      <span className="mb-2 block text-base font-medium text-white">성별</span>

      <div className="flex gap-3">
        {GENDER_ITEMS.map((item) => {
          const isSelected = item.value === value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={`h-14 flex-1 cursor-pointer rounded-xl border text-base font-bold transition-colors ${
                isSelected ? VARIANT_CLASS[variant].selected : VARIANT_CLASS[variant].unselected
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
