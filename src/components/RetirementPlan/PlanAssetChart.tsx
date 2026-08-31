import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PlanAssetPoint } from "@/types/retirementPlan";
import { formatNumber } from "@/utils/format";

const AXIS_COLOR = "#787f9a";
const LINE_COLOR = "#fdd58c";

interface PlanAssetChartProps {
  data: PlanAssetPoint[];
}

interface TooltipProps {
  active?: boolean;
  label?: number;
  payload?: { value: number }[];
}

// 다크 배경용 툴팁
function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-muted bg-card px-3 py-2 text-xs text-white">
      <p className="font-bold">{label}세</p>
      <p className="mt-1 text-sub-yellow">{formatNumber(payload[0].value)}원</p>
    </div>
  );
}

export default function PlanAssetChart({ data }: PlanAssetChartProps) {
  return (
    <section className="rounded-2xl border border-white/15 bg-card px-4 py-5">
      <h2 className="text-sm font-bold text-white">추천 적용 후 예상 자산 변화</h2>

      <p className="mt-3 text-xs text-muted">자산 (원)</p>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <defs>
              <linearGradient id="planAssetArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={LINE_COLOR} stopOpacity={0.35} />
                <stop offset="100%" stopColor={LINE_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={AXIS_COLOR} strokeOpacity={0.15} vertical={false} />

            <XAxis
              dataKey="age"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: AXIS_COLOR, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: AXIS_COLOR }}
            />

            <YAxis
              tickFormatter={(value: number) => formatNumber(value)}
              tick={{ fill: AXIS_COLOR, fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={72}
            />

            <Tooltip content={<ChartTooltip />} cursor={{ stroke: AXIS_COLOR }} />

            <Area
              type="monotone"
              dataKey="asset"
              stroke={LINE_COLOR}
              strokeWidth={2}
              fill="url(#planAssetArea)"
              dot={{ r: 3, fill: LINE_COLOR, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-muted">* timeline 데이터 기반으로 그래프가 표시됩니다.</p>
    </section>
  );
}
