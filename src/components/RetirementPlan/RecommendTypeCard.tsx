interface RecommendTypeCardProps {
  title: string;
  description: string;
}

// 추천 유형 안내 카드
export default function RecommendTypeCard({ title, description }: RecommendTypeCardProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-sub-yellow px-5 py-5">
      {/* 배경 그라데이션, 투명하게 깔림 */}
      <div className="bg-gradient-plan absolute inset-0 opacity-20" />

      <div className="relative">
        <p className="text-xs font-bold text-sub-yellow">추천 유형</p>
        <h2 className="mt-1 text-lg leading-snug font-bold text-white">{title}</h2>

        <p className="mt-3 text-xs leading-relaxed text-white/80">{description}</p>
      </div>
    </section>
  );
}
