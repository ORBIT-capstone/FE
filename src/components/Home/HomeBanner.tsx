import astronaut from "@/assets/images/AstrounutHome.svg";
import Button from "@/components/common/button/Button";
import type { UserType } from "@/stores/userTypeStore";

// 화면별 제목 크기·폭
const TITLE_CLASS: Record<UserType, string> = {
  employed: "text-lg tracking-tight whitespace-nowrap",
  retired: "text-lg tracking-tight whitespace-nowrap",
};

// 화면별 우주비행사 노출 각도·위치
const ASTRONAUT_CLASS: Record<UserType, string> = {
  employed: "-right-3 -bottom-8 w-30 rotate-210",
  retired: "right-5 -bottom-15 w-30",
};

interface HomeBannerProps {
  userType: UserType;
  title: string;
  descriptions: string[];
  buttonLabel: string;
  onButtonClick?: () => void;
}

export default function HomeBanner({
  userType,
  title,
  descriptions,
  buttonLabel,
  onButtonClick,
}: HomeBannerProps) {
  return (
    <section className="relative min-h-47 overflow-hidden rounded-2xl bg-bg-base">
      <div className="banner-layer-1 absolute inset-0 opacity-60" />
      <div className="banner-layer-2 absolute inset-0 opacity-50" />

      <img
        src={astronaut}
        alt=""
        className={`pointer-events-none absolute ${ASTRONAUT_CLASS[userType]}`}
      />

      <div className="relative px-5 py-7">
        <h2 className={`leading-snug font-bold text-white ${TITLE_CLASS[userType]}`}>{title}</h2>

        <div className="mt-4 text-sm leading-relaxed text-white">
          {descriptions.map((description) => (
            <p key={description}>{description}</p>
          ))}
        </div>

        <Button variant="pill" onClick={onButtonClick} className="mt-6">
          {buttonLabel}
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </section>
  );
}
