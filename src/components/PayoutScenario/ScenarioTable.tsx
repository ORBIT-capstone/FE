import type { PayoutMethod, PayoutScenarioRow } from "@/types/payoutScenario";
import { formatNumber } from "@/utils/format";

// 수령방식별 색 점
const DOT_CLASS: Record<PayoutMethod, string> = {
  normal: "bg-scenario-normal",
  early: "bg-scenario-early",
  lump: "bg-scenario-lump",
  split: "bg-scenario-split",
};

interface ScenarioTableProps {
  scenarios: PayoutScenarioRow[];
}

export default function ScenarioTable({ scenarios }: ScenarioTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse">
        <thead>
          <tr className="border-b border-white/25">
            <th className="px-2 pb-3 text-sm font-bold whitespace-nowrap text-white">수령방식</th>
            <th className="px-2 pb-3 text-sm font-bold whitespace-nowrap text-white">
              월 수령액 (예상)
            </th>
            <th className="px-2 pb-3 text-sm font-bold whitespace-nowrap text-white">
              총 수령액 (만원)
            </th>
            <th className="px-2 pb-3 text-sm font-bold whitespace-nowrap text-white">
              자산 고갈 예상 나이
            </th>
            <th className="px-2 pb-3 text-sm font-bold whitespace-nowrap text-white">
              손익분기 나이
            </th>
          </tr>
        </thead>

        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.method} className="border-b border-white/15">
              <td className="px-2 py-4">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span
                    className={`size-2.5 shrink-0 rounded-full ${DOT_CLASS[scenario.method]}`}
                  />
                  <span className="text-sm whitespace-nowrap text-white">{scenario.label}</span>

                  {scenario.isOptimal && (
                    <span className="shrink-0 rounded-full bg-scenario-lump px-2 py-0.5 text-xs font-bold whitespace-nowrap text-bg-base">
                      최적
                    </span>
                  )}
                </div>
              </td>

              <td className="px-2 py-4 text-center text-sm whitespace-pre-line tabular-nums text-white">
                {scenario.monthlyAmount}
              </td>

              <td className="px-2 py-4 text-center text-sm whitespace-nowrap tabular-nums text-white">
                {formatNumber(scenario.totalAmount)}
              </td>

              <td className="px-2 py-4 text-center text-sm whitespace-nowrap tabular-nums text-white">
                {scenario.depletionAge === null ? "고갈없음" : `${scenario.depletionAge}세`}
              </td>

              <td className="px-2 py-4 text-center text-sm whitespace-nowrap tabular-nums text-white">
                {scenario.breakEvenAge === null ? "-" : `${scenario.breakEvenAge}세`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
