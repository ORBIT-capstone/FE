import { useEffect, useRef } from "react";

// 자동 사라짐 시간
const DURATION = 2000;

export const SAVE_TOAST_MESSAGE = "저장되었습니다";

interface ToastProps {
  message: string;
  onClose: () => void;
}

// 하단에 잠시 노출되는 안내 문구
export default function Toast({ message, onClose }: ToastProps) {
  const onCloseRef = useRef(onClose);

  // 타이머 재시작 없이 최신 핸들러 유지
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => onCloseRef.current(), DURATION);

    // 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center px-7"
    >
      <p className="animate-toast-in rounded-full bg-white/90 px-6 py-3 text-sm font-bold text-bg-base shadow-lg backdrop-blur-sm">
        {message}
      </p>
    </div>
  );
}
