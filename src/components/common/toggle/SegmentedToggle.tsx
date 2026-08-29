export interface SegmentedToggleItem<T extends string> {
  label: string;
  value: T;
}

interface SegmentedToggleProps<T extends string> {
  items: SegmentedToggleItem<T>[];
  value: T;
  onChange: (value: T) => void;
  // 항목 높이 지정용
  itemClassName?: string;
}

export default function SegmentedToggle<T extends string>({
  items,
  value,
  onChange,
  itemClassName = "h-14",
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
