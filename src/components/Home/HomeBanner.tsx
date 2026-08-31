import employedAstronaut from "@/assets/images/AstrounutHome.svg";
import retiredAstronaut from "@/assets/images/astronutRetirement.svg";
import Button from "@/components/common/button/Button";
import type { ButtonTone } from "@/components/common/button/Button";
import type { UserType } from "@/stores/userTypeStore";

// 화면별 제목 크기·폭
const TITLE_CLASS: Record<UserType, string> = {
  employed: "text-lg tracking-tight whitespace-nowrap",
  retired: "text-lg tracking-tight whitespace-nowrap",
};

// 화면별 우주비행사 이미지와 노출 각도·위치
const ASTRONAUT: Record<UserType, { src: string; className: string }> = {
  employed: { src: employedAstronaut, className: "-right-3 -bottom-8 w-30 rotate-210" },
  retired: { src: retiredAstronaut, className: "right-4 -bottom-15 w-30" },
};

// 화면별 배경 그라데이션 2층
const LAYER_CLASS: Record<UserType, { first: string; second: string }> = {
  employed: { first: "banner-layer-1 opacity-60", second: "banner-layer-2 opacity-50" },
  retired: {
    first: "banner-retired-layer-1 opacity-60",
    second: "banner-retired-layer-2 opacity-50",
  },
};

const BUTTON_TONE: Record<UserType, ButtonTone> = {
  employed: "primary",
  retired: "mint",
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
  const astronaut = ASTRONAUT[userType];
  const layer = LAYER_CLASS[userType];

  return (
    <section className="relative min-h-47 overflow-hidden rounded-2xl bg-bg-base">
      <div className={`absolute inset-0 ${layer.first}`} />
      <div className={`absolute inset-0 ${layer.second}`} />

      <img
        src={astronaut.src}
        alt=""
        className={`pointer-events-none absolute ${astronaut.className}`}
      />

      <div className="relative px-5 py-7">
        <h2 className={`leading-snug font-bold text-white ${TITLE_CLASS[userType]}`}>{title}</h2>

        <div className="mt-4 text-sm leading-relaxed text-white">
          {descriptions.map((description) => (
            <p key={description}>{description}</p>
          ))}
        </div>

        <Button
          variant="pill"
          tone={BUTTON_TONE[userType]}
          onClick={onButtonClick}
          className="mt-6"
        >
          {buttonLabel}
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </section>
  );
}
