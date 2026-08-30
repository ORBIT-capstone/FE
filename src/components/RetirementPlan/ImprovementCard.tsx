interface ImprovementCardProps {
  icon: string;
  title: string;
  prefix: string;
  amount: string;
  suffix: string;
}

// 개선안 항목 카드
export default function ImprovementCard({
  icon,
  title,
  prefix,
  amount,
  suffix,
}: ImprovementCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-card px-5 py-4">
      <img src={icon} alt="" className="size-12 shrink-0" />

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-sub-yellow">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-white">
          {prefix}
          <br />
          매월 <span className="font-bold text-sub-yellow">{amount}</span>
          {suffix}
        </p>
      </div>
    </div>
  );
}
