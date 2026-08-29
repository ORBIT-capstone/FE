import type { UserType } from "@/stores/userTypeStore";

const TOGGLE_ITEMS: { label: string; value: UserType }[] = [
  { label: "재직자", value: "employed" },
  { label: "퇴직자", value: "retired" },
];

interface UserTypeToggleProps {
  value: UserType;
  onChange: (userType: UserType) => void;
}

export default function UserTypeToggle({ value, onChange }: UserTypeToggleProps) {
  return (
    <div className="flex overflow-hidden rounded-2xl bg-card">
      {TOGGLE_ITEMS.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`h-16 flex-1 cursor-pointer rounded-2xl text-base font-bold transition-colors ${
              isActive ? "bg-btn-active text-bg-base" : "text-neutral-400"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
