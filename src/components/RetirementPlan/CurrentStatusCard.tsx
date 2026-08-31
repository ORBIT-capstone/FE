import StatusGauge from "@/components/RetirementPlan/StatusGauge";
import type { ReadinessStatus } from "@/types/diagnosis";

interface CurrentStatusCardProps {
  status: ReadinessStatus;
  description: string;
  score: number;
  icon: string;
}

// 현재 준비 상태 카드
export default function CurrentStatusCard({
  status,
  description,
  score,
  icon,
}: CurrentStatusCardProps) {
  return (
    <section className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-card px-5 py-5">
      <div className="min-w-0">
        <p className="text-xs text-muted">현재 상태</p>
        <p className="mt-2 text-2xl font-bold text-sub-yellow">{status}</p>
        <p className="mt-2 text-xs leading-relaxed whitespace-pre-line text-white">{description}</p>
      </div>

      <StatusGauge score={score} icon={icon} />
    </section>
  );
}
