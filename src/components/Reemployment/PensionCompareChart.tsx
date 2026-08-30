import { formatNumber } from "@/utils/format";

// 기존·재취업 연금 막대 색상
const BAR_COLOR = { original: "#b8bdd6", reduced: "#ffffff" };

interface PensionCompareChartProps {
  // 감액 전 월 연금액, 원 단위
  originalPension: number;
  // 감액 후 월 연금액, 원 단위
  reducedPension: number;
}

export default function PensionCompareChart({
  originalPension,
  reducedPension,
}: PensionCompareChartProps) {
  const maxAmount = Math.max(originalPension, reducedPension, 1);

  const bars = [
    { label: "기존 연금액", amount: originalPension, color: BAR_COLOR.original },
    { label: "재취업 연금액", amount: reducedPension, color: BAR_COLOR.reduced },
  ];

  return (
    <div className="flex h-full w-full items-end justify-center gap-10 pb-2">
      {bars.map((bar) => {
        const heightRate = (bar.amount / maxAmount) * 100;

        return (
          <div key={bar.label} className="flex h-full w-16 flex-col">
            <div className="relative flex-1">
              <div
                className="absolute inset-x-0 bottom-0"
                style={{ height: `${heightRate}%`, backgroundColor: bar.color }}
              />

              <p
                className="absolute left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap text-white"
                style={{ bottom: `calc(${heightRate}% + 8px)` }}
              >
                {formatNumber(bar.amount)}원
              </p>
            </div>

            <div className="relative mt-3 h-4">
              <p className="absolute left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-muted">
                {bar.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
