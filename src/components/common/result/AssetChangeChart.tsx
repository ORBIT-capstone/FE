import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AssetFlowPoint } from "@/utils/diagnosis";
import { formatNumber } from "@/utils/format";
import type { ResultTone } from "@/utils/resultTone";
import { RESULT_TONE } from "@/utils/resultTone";

const AXIS_COLOR = "#787f9a";

interface AssetChangeChartProps {
  data: AssetFlowPoint[];
  // 자산·누적 교차 시점
  crossAge: number | null;
  tone?: ResultTone;
}

// 다크 배경용 툴팁
function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-muted bg-card px-3 py-2 text-xs text-white">
      <p className="font-bold">{label}세</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="mt-1 flex items-center gap-1">
          <span className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.dataKey === "asset" ? "자산" : "누적"} {formatNumber(item.value)}만원
        </p>
      ))}
    </div>
  );
}

interface TooltipProps {
  active?: boolean;
  label?: number;
  payload?: { dataKey: string; value: number; color: string }[];
}

export default function AssetChangeChart({ data, crossAge, tone = "pink" }: AssetChangeChartProps) {
  const chartColor = RESULT_TONE[tone].chart;

  return (
    <section className="rounded-2xl border border-white/15 bg-card px-4 py-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <h2 className="text-sm font-bold text-white">예상 자산 변화 (연 단위)</h2>

        <span className="flex items-center gap-1 text-xs text-white">
          <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: chartColor.asset }} />
          자산
        </span>

        <span className="flex items-center gap-1 text-xs text-white">
          <span
            className="h-0.5 w-5 rounded-full"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, ${chartColor.cumulative} 0 4px, transparent 4px 7px)`,
            }}
          />
          소득 - 지출(누적)
        </span>
      </div>

      <p className="mt-3 text-xs text-muted">(만원)</p>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid stroke={AXIS_COLOR} strokeOpacity={0.15} vertical={false} />

            <XAxis
              dataKey="age"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(age: number) => `${age}세`}
              tick={{ fill: AXIS_COLOR, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: AXIS_COLOR }}
            />

            <YAxis
              tick={{ fill: AXIS_COLOR, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={48}
            />

            <Tooltip content={<ChartTooltip />} cursor={{ stroke: AXIS_COLOR }} />

            {crossAge !== null && (
              <ReferenceLine x={crossAge} stroke={AXIS_COLOR} strokeDasharray="4 4" />
            )}

            <Line
              type="linear"
              dataKey="asset"
              stroke={chartColor.asset}
              strokeWidth={2}
              dot={{ r: 3, fill: chartColor.asset, strokeWidth: 0 }}
              isAnimationActive={false}
            />

            <Line
              type="linear"
              dataKey="cumulative"
              stroke={chartColor.cumulative}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={{ r: 3, fill: chartColor.cumulative, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-muted">
        * 위 그래프는 현재 입력한 정보를 기반으로 산출된 예상치입니다.
      </p>
    </section>
  );
}
