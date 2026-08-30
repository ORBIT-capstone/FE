const SIZE = 132;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const ARC_LENGTH = Math.PI * RADIUS;

interface StatusGaugeProps {
  // 준비 수준 점수
  score: number;
  icon: string;
}

// 상태 표정 아이콘을 감싸는 반원 게이지
export default function StatusGauge({ score, icon }: StatusGaugeProps) {
  const arcPath = `M ${STROKE_WIDTH / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${
    SIZE - STROKE_WIDTH / 2
  } ${SIZE / 2}`;

  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE / 2 }}>
      <svg width={SIZE} height={SIZE / 2}>
        <defs>
          <linearGradient id="statusGaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fdd58c" />
            <stop offset="100%" stopColor="#f9c051" />
          </linearGradient>
        </defs>

        <path
          d={arcPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          className="text-back-bg"
        />

        <path
          d={arcPath}
          fill="none"
          stroke="url(#statusGaugeGradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={ARC_LENGTH * (1 - score / 100)}
        />
      </svg>

      <img src={icon} alt="" className="absolute bottom-0 left-1/2 w-14 -translate-x-1/2" />
    </div>
  );
}
