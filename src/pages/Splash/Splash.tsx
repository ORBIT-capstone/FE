import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import flashCharacter from "@/assets/images/FlashCharacter.svg";
import flashPhrase from "@/assets/images/flashPhrase.svg";
import orbitLogo from "@/assets/images/OrbitFlashImg.svg";
import StarBackground from "@/components/common/StarBackground";
import { useSplashStore } from "@/stores/splashStore";

// 플래시 노출 시간과 페이드 아웃 시간
const SPLASH_DURATION = 2000;
const FADE_DURATION = 500;

export default function Splash() {
  const navigate = useNavigate();
  const markSplashShown = useSplashStore((state) => state.markSplashShown);

  const [isVisible, setIsVisible] = useState(false);

  // 페이드 인 처리
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  // 페이드 아웃 후 홈 이동 처리
  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsVisible(false), SPLASH_DURATION);
    const moveTimer = setTimeout(() => {
      markSplashShown();
      navigate("/", { replace: true });
    }, SPLASH_DURATION + FADE_DURATION);

    // 타이머 정리
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(moveTimer);
    };
  }, [markSplashShown, navigate]);

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-gradient-splash">
      <StarBackground />

      <div
        className={`relative mx-auto flex min-h-svh w-full max-w-97.5 flex-col items-center px-7 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img src={orbitLogo} alt="ORBIT" className="mt-52 w-full max-w-88" />

        <img
          src={flashPhrase}
          alt="당신의 내일을, 가장 안정적인 궤도에"
          className="mt-4 w-full max-w-60"
        />

        <img src={flashCharacter} alt="" className="mt-auto w-full max-w-76 translate-x-6" />
      </div>
    </div>
  );
}
