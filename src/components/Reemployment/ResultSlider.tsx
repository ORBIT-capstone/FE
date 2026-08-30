import { useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

// 페이지 전환 기준 이동 비율
const SWIPE_RATIO = 0.2;

interface ResultSliderProps {
  slides: ReactNode[];
}

// 좌우 드래그·스와이프로 전환되는 결과 슬라이더
export default function ResultSlider({ slides }: ResultSliderProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    setDragX(event.clientX - startXRef.current);
  };

  // 이동량 기준 이전·다음 페이지 확정 처리
  const handlePointerUp = () => {
    if (!isDragging) return;

    const threshold = (viewportRef.current?.clientWidth ?? 0) * SWIPE_RATIO;

    if (dragX < -threshold && index < slides.length - 1) setIndex(index + 1);
    else if (dragX > threshold && index > 0) setIndex(index - 1);

    setDragX(0);
    setIsDragging(false);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="min-h-0 flex-1 touch-pan-y overflow-hidden select-none"
      >
        <div
          className={`flex h-full ${isDragging ? "" : "transition-transform duration-300"}`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="h-full w-full shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`${dotIndex + 1}번째 결과 보기`}
            className={`size-3.5 cursor-pointer rounded-full border border-white ${
              dotIndex === index ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
