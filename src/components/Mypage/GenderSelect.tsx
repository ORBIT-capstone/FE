import type { Gender } from "@/stores/profileStore";

const GENDER_ITEMS: { label: string; value: Gender }[] = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

interface GenderSelectProps {
  value: Gender;
  onChange: (gender: Gender) => void;
}

export default function GenderSelect({ value, onChange }: GenderSelectProps) {
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
                isSelected
                  ? "border-btn-active bg-btn-active text-bg-base"
                  : "border-muted bg-field-dark text-muted"
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
