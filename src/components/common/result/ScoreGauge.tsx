import type { ResultTone } from "@/utils/resultTone";
import { RESULT_TONE } from "@/utils/resultTone";

export type ScoreGaugeSize = "default" | "large";

// 크기별 지름·두께·글자 스타일
const SIZE_STYLE: Record<
  ScoreGaugeSize,
  { size: number; stroke: number; score: string; status: string }
> = {
  default: { size: 132, stroke: 12, score: "text-2xl", status: "text-sm" },
  large: { size: 236, stroke: 24, score: "text-5xl", status: "text-xl" },
};

interface ScoreGaugeProps {
  score: number;
  statusLabel: string;
  tone?: ResultTone;
  size?: ScoreGaugeSize;
}

export default function ScoreGauge({
  score,
  statusLabel,
  tone = "pink",
  size = "default",
}: ScoreGaugeProps) {
  const {
    size: diameter,
    stroke: strokeWidth,
    score: scoreClass,
    status: statusClass,
  } = SIZE_STYLE[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const toneStyle = RESULT_TONE[tone];
  const gradientId = `scoreGaugeGradient-${tone}`;

  return (
    <div className="relative shrink-0" style={{ width: diameter, height: diameter }}>
      <svg width={diameter} height={diameter} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={toneStyle.gaugeFrom} />
            <stop offset="100%" stopColor={toneStyle.gaugeTo} />
          </linearGradient>
        </defs>

        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-back-bg"
        />

        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold text-white ${scoreClass}`}>{score}점</span>
        <span className={`${statusClass} ${toneStyle.accentClass}`}>{statusLabel}</span>
      </div>
    </div>
  );
}
