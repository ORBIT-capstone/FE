export interface KeyInfoItem {
  icon: string;
  label: string;
  value: string;
}

interface KeyInfoListProps {
  items: KeyInfoItem[];
}

// 진단 핵심 정보 목록
export default function KeyInfoList({ items }: KeyInfoListProps) {
  return (
    <section className="rounded-2xl border border-white/15 bg-card px-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 border-b border-white/10 py-4 last:border-b-0"
        >
          <img src={item.icon} alt="" className="size-6 shrink-0" />

          <p className="text-sm text-white">{item.label}</p>

          <p className="ml-auto text-sm font-bold text-sub-yellow">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
