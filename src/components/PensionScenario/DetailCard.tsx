import type { ReactNode } from "react";

export interface DetailRow {
  label?: string;
  value: string;
}

interface DetailCardProps {
  title: string;
  rows: DetailRow[];
  // 제목 우측 아이콘 슬롯
  icon?: ReactNode;
}

export default function DetailCard({ title, rows, icon }: DetailCardProps) {
  return (
    <section className="rounded-2xl border border-white/15 bg-card px-5 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">{title}</h2>
        {icon}
      </div>

      <div className="mt-3 h-px bg-white/15" />

      <dl className="mt-4 flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label ?? row.value} className="flex items-center justify-between">
            <dt className="text-sm text-white">{row.label}</dt>
            <dd className="text-base font-bold text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
