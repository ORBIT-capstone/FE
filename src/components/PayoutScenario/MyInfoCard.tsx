export interface MyInfoItem {
  icon: string;
  label: string;
  value: string;
}

interface MyInfoCardProps {
  items: [MyInfoItem, MyInfoItem, MyInfoItem, MyInfoItem];
  onEditClick: () => void;
}

export default function MyInfoCard({ items, onEditClick }: MyInfoCardProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">내 정보</h2>

        <button type="button" onClick={onEditClick} className="cursor-pointer text-sm text-white">
          수정
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl border border-muted">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-4 ${index % 2 === 0 ? "border-r" : ""} ${
              index < 2 ? "border-b" : ""
            } border-muted`}
          >
            <img src={item.icon} alt="" className="size-10 shrink-0" />

            <div className="min-w-0">
              <p className="text-xs text-muted">{item.label}</p>
              <p className="truncate text-base font-bold text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
