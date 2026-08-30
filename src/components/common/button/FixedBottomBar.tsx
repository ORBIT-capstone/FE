import type { ReactNode } from "react";

interface FixedBottomBarProps {
  children: ReactNode;
}

// 화면 하단 고정 버튼 영역, 뒤 콘텐츠는 블러·그림자로 가림
export default function FixedBottomBar({ children }: FixedBottomBarProps) {
  return (
    <div className="fixed-bottom-blur fixed inset-x-0 bottom-0 z-10">
      <div className="mx-auto flex w-full max-w-97.5 flex-col gap-3 px-7 pt-8 pb-8">{children}</div>
    </div>
  );
}
