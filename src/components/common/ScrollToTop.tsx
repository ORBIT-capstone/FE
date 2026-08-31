import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// 화면이 바뀌면 항상 최상단에서 시작, 뒤로가기 포함
export default function ScrollToTop() {
  // 같은 경로 재진입과 뒤로가기까지 감지
  const { key } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return null;
}
