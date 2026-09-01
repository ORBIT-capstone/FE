const SIZE = 132;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// 하단만 열린 270도 게이지
const ARC_RATIO = 0.75;
const ARC_LENGTH = CIRCUMFERENCE * ARC_RATIO;

interface StatusGaugeProps {
  // 준비 수준 점수
  score: number;
  icon: string;
}

// 상태 표정 아이콘을 감싸는 원형 게이지
export default function StatusGauge({ score, icon }: StatusGaugeProps) {
  const center = SIZE / 2;

  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="rotate-135">
        <defs>
          <linearGradient id="statusGaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fdd58c" />
            <stop offset="100%" stopColor="#f9c051" />
          </linearGradient>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
          className="text-back-bg"
        />

        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke="url(#statusGaugeGradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${(ARC_LENGTH * score) / 100} ${CIRCUMFERENCE}`}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* 아이콘마다 가로세로 비율이 달라 정사각 박스에 맞춤 */}
        <img src={icon} alt="" className="size-24 translate-x-2 object-contain" />
      </div>
    </div>
  );
}
