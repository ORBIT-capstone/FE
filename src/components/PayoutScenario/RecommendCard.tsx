import type { PayoutMethod } from "@/mocks/payoutScenario";

// 수령방식별 배너 색상, 배경은 20% 투명도
const BANNER_CLASS: Record<PayoutMethod, string> = {
  normal: "border-scenario-normal bg-scenario-normal/20",
  early: "border-scenario-early bg-scenario-early/20",
  lump: "border-scenario-lump bg-scenario-lump/20",
  split: "border-scenario-split bg-scenario-split/20",
};

const LABEL_CLASS: Record<PayoutMethod, string> = {
  normal: "text-scenario-normal",
  early: "text-scenario-early",
  lump: "text-scenario-lump",
  split: "text-scenario-split",
};

interface RecommendCardProps {
  method: PayoutMethod;
  label: string;
  depletionAge: number;
}

export default function RecommendCard({ method, label, depletionAge }: RecommendCardProps) {
  return (
    <section
      className={`flex items-end justify-between rounded-2xl border px-5 py-4 ${BANNER_CLASS[method]}`}
    >
      <div>
        <p className="text-sm text-white">추천 수령 방식</p>
        <p className={`mt-1 text-2xl font-bold ${LABEL_CLASS[method]}`}>{label}</p>
      </div>

      <p className="text-2xl font-bold text-white">{depletionAge}세</p>
    </section>
  );
}
