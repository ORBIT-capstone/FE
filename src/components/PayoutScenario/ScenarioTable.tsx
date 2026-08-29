import type { PayoutScenario } from "@/mocks/payoutScenario";
import { formatNumber } from "@/utils/format";

// 수령방식별 색 점
const DOT_CLASS: Record<PayoutScenario["method"], string> = {
  normal: "bg-scenario-normal",
  early: "bg-scenario-early",
  lump: "bg-scenario-lump",
  split: "bg-scenario-split",
};

interface ScenarioTableProps {
  scenarios: PayoutScenario[];
}

export default function ScenarioTable({ scenarios }: ScenarioTableProps) {
  return (
    <table className="w-full table-fixed border-collapse">
      <thead>
        <tr className="border-b border-white/25">
          <th className="pb-3 text-sm font-bold text-white">수령방식</th>
          <th className="pb-3 text-sm font-bold text-white">월 수령액 (예상)</th>
          <th className="pb-3 text-sm font-bold text-white">총 수령액 (만원)</th>
          <th className="pb-3 text-sm font-bold text-white">자산 고갈 예상 나이</th>
        </tr>
      </thead>

      <tbody>
        {scenarios.map((scenario) => (
          <tr key={scenario.method} className="border-b border-white/15">
            <td className="py-4">
              <div className="flex items-center gap-1.5">
                <span className={`size-2.5 shrink-0 rounded-full ${DOT_CLASS[scenario.method]}`} />
                <span className="text-sm text-white">{scenario.label}</span>

                {scenario.isOptimal && (
                  <span className="rounded-full bg-scenario-lump px-2 py-0.5 text-xs font-bold text-bg-base">
                    최적
                  </span>
                )}
              </div>
            </td>

            <td className="py-4 text-center text-sm whitespace-pre-line text-white">
              {scenario.monthlyAmount}
            </td>

            <td className="py-4 text-center text-sm text-white">
              {formatNumber(scenario.totalAmount)}
            </td>

            <td className="py-4 text-center text-sm text-white">{scenario.depletionAge}세</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
