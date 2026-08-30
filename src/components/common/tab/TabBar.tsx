export interface TabItem<T extends string> {
  label: string;
  value: T;
}

interface TabBarProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function TabBar<T extends string>({ items, value, onChange }: TabBarProps<T>) {
  return (
    <div>
      <div className="flex">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`flex-1 cursor-pointer pb-3 text-base transition-colors ${
              item.value === value ? "font-bold text-white" : "text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex h-1 gap-0">
        {items.map((item) => (
          <span
            key={item.value}
            className={`flex-1 rounded-full ${item.value === value ? "bg-btn-active" : "bg-white/15"}`}
          />
        ))}
      </div>
    </div>
  );
}
