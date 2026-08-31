import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function useLoginGuard() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.user) !== null;

  // 로그인 유도 팝업 노출 여부
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 로그인 상태에서만 실행, 아니면 로그인 유도 팝업 노출
  const requireLogin = (action: () => void) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    action();
  };

  return {
    isLoggedIn,
    isLoginModalOpen,
    requireLogin,
    openLoginModal: () => setIsLoginModalOpen(true),
    closeLoginModal: () => setIsLoginModalOpen(false),
    goLogin: () => navigate("/login"),
  };
}
