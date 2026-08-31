import type { ReactNode } from "react";

interface FixedBottomBarProps {
  children: ReactNode;
}

// 하단 고정 버튼 영역, 스크롤 끝에서는 콘텐츠 뒤에 자연스럽게 배치
export default function FixedBottomBar({ children }: FixedBottomBarProps) {
  return (
    <div className="fixed-bottom-blur sticky bottom-0 z-10 mt-auto w-full">
      <div className="pb-bottom-safe mx-auto flex w-full max-w-97.5 flex-col gap-3 px-7 pt-6">
        {children}
      </div>
    </div>
  );
}
