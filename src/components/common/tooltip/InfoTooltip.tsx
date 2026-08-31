import { useState } from "react";
import infoIcon from "@/assets/icons/infoIcon.svg";

interface InfoTooltipProps {
  message: string;
  // 버튼 접근성 문구
  label?: string;
}

// 느낌표 아이콘 클릭 시 열리는 말풍선 안내
export default function InfoTooltip({ message, label = "설명 보기" }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center"
      >
        <img src={infoIcon} alt="" className="size-6" />
      </button>

      {isOpen && (
        <>
          {/* 바깥 영역 클릭 시 닫힘 */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 cursor-default"
          />

          <div
            role="tooltip"
            className="absolute top-full right-0 z-30 mt-3 w-64 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm"
          >
            {/* 말풍선 꼬리 */}
            <span
              aria-hidden="true"
              className="absolute -top-1 right-2.5 size-3 rotate-45 rounded-xs bg-white/90"
            />

            <p className="relative text-xs leading-relaxed break-keep whitespace-pre-line text-bg-base">
              {message}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
