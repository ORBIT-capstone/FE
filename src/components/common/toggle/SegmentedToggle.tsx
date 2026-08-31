export interface SegmentedToggleItem<T extends string> {
  label: string;
  value: T;
}

export type SegmentedToggleTone = "primary" | "mint";

// 활성 항목 색상 계열
const ACTIVE_CLASS: Record<SegmentedToggleTone, string> = {
  primary: "bg-btn-active text-bg-base",
  mint: "bg-mint text-bg-base",
};

interface SegmentedToggleProps<T extends string> {
  items: SegmentedToggleItem<T>[];
  value: T;
  onChange: (value: T) => void;
  // 항목 높이 지정용
  itemClassName?: string;
  tone?: SegmentedToggleTone;
}

export default function SegmentedToggle<T extends string>({
  items,
  value,
  onChange,
  itemClassName = "h-14",
  tone = "primary",
}: SegmentedToggleProps<T>) {
  return (
    <div className="flex overflow-hidden rounded-2xl bg-card">
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`flex-1 cursor-pointer rounded-2xl text-base font-bold transition-colors ${itemClassName} ${
              isActive ? ACTIVE_CLASS[tone] : "text-neutral-400"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
