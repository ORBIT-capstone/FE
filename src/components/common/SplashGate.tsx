import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSplashStore } from "@/stores/splashStore";

interface SplashGateProps {
  children: ReactNode;
}

// 앱 최초 진입 시 플래시 화면 우선 노출
export default function SplashGate({ children }: SplashGateProps) {
  const isSplashShown = useSplashStore((state) => state.isSplashShown);

  if (!isSplashShown) return <Navigate to="/splash" replace />;

  return <>{children}</>;
}
