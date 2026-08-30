interface RecommendTypeCardProps {
  icon: string;
  title: string;
  description: string;
}

// 추천 유형 안내 카드
export default function RecommendTypeCard({ icon, title, description }: RecommendTypeCardProps) {
  return (
    <section className="bg-gradient-plan rounded-2xl px-5 py-5">
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-bg-base">
          <img src={icon} alt="" className="w-8" />
        </span>

        <div className="min-w-0">
          <p className="text-xs font-bold text-bg-base/70">추천 유형</p>
          <h2 className="mt-1 text-lg leading-snug font-bold text-bg-base">{title}</h2>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-bg-base/80">{description}</p>
    </section>
  );
}
