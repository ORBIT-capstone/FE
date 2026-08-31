import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { PAYOUT_COLOR } from "@/mocks/payoutScenario";
import type { AssetFlowPoint } from "@/types/payoutScenario";

const AXIS_COLOR = "#787f9a";

interface AssetFlowChartProps {
  data: AssetFlowPoint[];
  earlyYears: number;
}

export default function AssetFlowChart({ data, earlyYears }: AssetFlowChartProps) {
  const legends = [
    { label: "정상수령", color: PAYOUT_COLOR.normal },
    { label: `조기수령(${earlyYears}년)`, color: PAYOUT_COLOR.early },
    { label: "일시금", color: PAYOUT_COLOR.lump },
    { label: "분할수령", color: PAYOUT_COLOR.split },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="text-xs text-muted">자산 (만원)</span>

        {legends.map((legend) => (
          <span key={legend.label} className="flex items-center gap-1 text-xs text-white">
            <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: legend.color }} />
            <span className="size-2 rounded-full" style={{ backgroundColor: legend.color }} />
            {legend.label}
          </span>
        ))}
      </div>

      <div className="mt-3 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid stroke={AXIS_COLOR} strokeOpacity={0.15} vertical={false} />

            <XAxis
              dataKey="age"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: AXIS_COLOR, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: AXIS_COLOR }}
              label={{
                value: "나이 (세)",
                position: "insideBottomRight",
                fill: AXIS_COLOR,
                fontSize: 11,
              }}
            />

            <YAxis
              tick={{ fill: AXIS_COLOR, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: AXIS_COLOR }}
              width={48}
            />

            {(["normal", "early", "lump", "split"] as const).map((method) => (
              <Line
                key={method}
                type="linear"
                dataKey={method}
                stroke={PAYOUT_COLOR[method]}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
