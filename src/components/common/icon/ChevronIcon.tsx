export type ChevronDirection = "up" | "down" | "left" | "right";

interface ChevronIconProps {
  direction?: ChevronDirection;
  className?: string;
}

// 방향별 회전값, 기준은 아래 방향
const ROTATION_CLASS: Record<ChevronDirection, string> = {
  down: "rotate-0",
  up: "rotate-180",
  left: "rotate-90",
  right: "-rotate-90",
};

export default function ChevronIcon({ direction = "down", className = "" }: ChevronIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-5 ${ROTATION_CLASS[direction]} ${className}`}
    >
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}
