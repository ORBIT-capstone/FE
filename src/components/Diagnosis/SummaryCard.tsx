import { useState } from "react";
import ChevronIcon from "@/components/common/icon/ChevronIcon";
import ScoreGauge from "@/components/Diagnosis/ScoreGauge";

export interface SummaryChip {
  label: string;
  value: string;
  // 핑크 강조 여부
  isEmphasis?: boolean;
}

interface SummaryCardProps {
  score: number;
  statusLabel: string;
  headline: string;
  description: string;
  chips: SummaryChip[];
}

export default function SummaryCard({
  score,
  statusLabel,
  headline,
  description,
  chips,
}: SummaryCardProps) {
  // 상세 칩 펼침 여부
  const [isExpanded, setIsExpanded] = useState(false);

  const topChips = chips.slice(0, 3);
  const bottomChips = chips.slice(3);

  return (
    <section className="rounded-2xl border border-white/15 bg-card px-5 py-5">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold text-white">진단 결과 요약</h2>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={isExpanded ? "상세 접기" : "상세 펼치기"}
          className="cursor-pointer text-white"
        >
          <ChevronIcon direction={isExpanded ? "down" : "right"} className="size-6" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <ScoreGauge score={score} statusLabel={statusLabel} />

        <div className="min-w-0">
          <p className="text-sm text-white">현재 준비 수준은</p>
          <p className="mt-1 text-xl font-bold text-gradient-score">{headline}</p>
          <p className="mt-2 text-xs leading-relaxed whitespace-pre-line text-white">
            {description}
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-5 flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {topChips.map((chip) => (
              <ChipItem key={chip.label} chip={chip} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {bottomChips.map((chip) => (
              <ChipItem key={chip.label} chip={chip} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ChipItem({ chip }: { chip: SummaryChip }) {
  return (
    <div className="rounded-xl border border-muted px-3 py-3">
      <p className="text-xs text-white">{chip.label}</p>
      <p className={`mt-1 text-sm font-bold ${chip.isEmphasis ? "text-btn-active" : "text-white"}`}>
        {chip.value}
      </p>
    </div>
  );
}
