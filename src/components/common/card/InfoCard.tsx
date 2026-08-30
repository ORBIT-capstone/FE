import type { ReactNode } from "react";
import ChevronIcon from "@/components/common/icon/ChevronIcon";

export type InfoCardSize = "default" | "large";

// 크기별 제목·설명 스타일
const SIZE_CLASS: Record<InfoCardSize, { title: string; description: string }> = {
  default: { title: "text-base", description: "mt-2 text-xs" },
  large: { title: "text-xl", description: "mt-2 text-base" },
};

interface InfoCardProps {
  title: string;
  description?: string;
  // 제목 왼쪽 아이콘 슬롯
  icon?: ReactNode;
  size?: InfoCardSize;
  onClick?: () => void;
}

export default function InfoCard({
  title,
  description,
  icon,
  size = "default",
  onClick,
}: InfoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-card px-5 py-5 text-left"
    >
      {icon}

      <div className="flex-1">
        <h3 className={`font-bold text-white ${SIZE_CLASS[size].title}`}>{title}</h3>
        {description && (
          <p className={`leading-relaxed text-neutral-300 ${SIZE_CLASS[size].description}`}>
            {description}
          </p>
        )}
      </div>

      <ChevronIcon direction="right" className="shrink-0 text-neutral-400" />
    </button>
  );
}
