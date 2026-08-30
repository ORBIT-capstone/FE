import type { AgeDetailRow } from "@/utils/diagnosis";
import { formatNumber } from "@/utils/format";
import type { ResultTone } from "@/utils/resultTone";
import { RESULT_TONE } from "@/utils/resultTone";

const COLUMNS = [
  "나이",
  "연간 소득 (만원)",
  "연간 지출 (만원)",
  "연간 부족액 (만원)",
  "누적 부족액 (만원)",
  "자산 (만원)",
];

interface AgeDetailTableProps {
  rows: AgeDetailRow[];
  tone?: ResultTone;
}

export default function AgeDetailTable({ rows, tone = "pink" }: AgeDetailTableProps) {
  const accentClass = RESULT_TONE[tone].accentClass;

  return (
    <section className="rounded-2xl border border-white/15 bg-card px-4 py-5">
      <h2 className="text-sm font-bold text-white">연령별 상세 내역</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-center">
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="border border-white/15 px-2 py-2 text-xs font-normal text-white"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.age}>
                <td className="border border-white/15 px-2 py-2 text-xs text-white">{row.age}세</td>
                <td className="border border-white/15 px-2 py-2 text-xs text-white">
                  {formatNumber(row.annualIncome)}
                </td>
                <td className="border border-white/15 px-2 py-2 text-xs text-white">
                  {formatNumber(row.annualExpense)}
                </td>
                <td className="border border-white/15 px-2 py-2 text-xs text-white">
                  {formatNumber(row.annualShortage)}
                </td>
                <td
                  className={`border border-white/15 px-2 py-2 text-xs ${
                    row.cumulativeShortage < 0 ? accentClass : "text-white"
                  }`}
                >
                  {formatNumber(row.cumulativeShortage)}
                </td>
                <td className="border border-white/15 px-2 py-2 text-xs text-white">
                  {formatNumber(row.asset)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted">연령별 데이터는 10년 단위로 제공됩니다.</p>
    </section>
  );
}
