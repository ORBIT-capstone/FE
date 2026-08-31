export type LoadingVariant = "overlay" | "inline";

// 표시 형태별 배치 스타일
const VARIANT_CLASS: Record<LoadingVariant, string> = {
  overlay: "fixed inset-0 z-50 bg-bg-base/85 backdrop-blur-sm",
  inline: "w-full py-20",
};

interface LoadingProps {
  message?: string;
  variant?: LoadingVariant;
}

// 데이터 요청 중 공통 로딩 표시
export default function Loading({
  message = "데이터를 불러오는 중입니다",
  variant = "inline",
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-5 ${VARIANT_CLASS[variant]}`}
    >
      <span className="size-12 animate-spin rounded-full border-4 border-white/15 border-t-btn-active" />

      <p className="text-sm whitespace-pre-line text-muted">{message}</p>
    </div>
  );
}
