export interface ChipItem<T extends string | number> {
  label: string;
  value: T;
}

interface ChipGroupProps<T extends string | number> {
  items: ChipItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function ChipGroup<T extends string | number>({
  items,
  value,
  onChange,
}: ChipGroupProps<T>) {
  return (
    <div className="flex gap-2">
      {items.map((item) => {
        const isSelected = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`h-12 flex-1 cursor-pointer rounded-xl border text-base transition-colors ${
              isSelected
                ? "border-btn-active bg-btn-active font-bold text-bg-base"
                : "border-muted text-white"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
