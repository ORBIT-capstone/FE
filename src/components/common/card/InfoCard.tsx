import type { ReactNode } from "react";
import ChevronIcon from "@/components/common/icon/ChevronIcon";

interface InfoCardProps {
  title: string;
  description?: string;
  // 제목 왼쪽 아이콘 슬롯
  icon?: ReactNode;
  onClick?: () => void;
}

export default function InfoCard({ title, description, icon, onClick }: InfoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-card px-5 py-5 text-left"
    >
      {icon}

      <div className="flex-1">
        <h3 className="text-base font-bold text-white">{title}</h3>
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-neutral-300">{description}</p>
        )}
      </div>

      <ChevronIcon direction="right" className="shrink-0 text-neutral-400" />
    </button>
  );
}
