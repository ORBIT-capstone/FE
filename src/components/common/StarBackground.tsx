interface Star {
  // 화면 기준 위치 백분율
  top: number;
  left: number;
  size: number;
  opacity: number;
  delay: number;
}

const STARS: Star[] = [
  { top: 4, left: 12, size: 4, opacity: 0.5, delay: 0 },
  { top: 6, left: 82, size: 6, opacity: 0.8, delay: 1.2 },
  { top: 11, left: 46, size: 4, opacity: 0.4, delay: 2.4 },
  { top: 14, left: 92, size: 5, opacity: 0.6, delay: 0.6 },
  { top: 19, left: 8, size: 6, opacity: 0.7, delay: 1.8 },
  { top: 23, left: 68, size: 4, opacity: 0.35, delay: 0.3 },
  { top: 31, left: 95, size: 7, opacity: 0.75, delay: 2.1 },
  { top: 38, left: 4, size: 5, opacity: 0.45, delay: 1.5 },
  { top: 47, left: 88, size: 5, opacity: 0.6, delay: 0.9 },
  { top: 53, left: 30, size: 6, opacity: 0.7, delay: 2.7 },
  { top: 58, left: 62, size: 4, opacity: 0.4, delay: 0.4 },
  { top: 66, left: 14, size: 5, opacity: 0.55, delay: 1.6 },
  { top: 72, left: 90, size: 6, opacity: 0.65, delay: 2.2 },
  { top: 81, left: 40, size: 4, opacity: 0.4, delay: 1.1 },
  { top: 88, left: 74, size: 5, opacity: 0.5, delay: 0.7 },
];

// 콘텐츠 높이와 무관하게 화면 기준 고정 배치
export default function StarBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {STARS.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="absolute animate-pulse rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255, 255, 255, 0.35)`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
