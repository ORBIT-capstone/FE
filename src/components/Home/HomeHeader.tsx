import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { useAuthStore } from "@/stores/authStore";

export default function HomeHeader() {
  const navigate = useNavigate();
  const nickname = useAuthStore((state) => state.user?.nickname);

  return (
    <header className="flex items-center justify-between pt-8">
      <img src={logo} alt="ORBIT" className="h-12 w-auto" />

      {/* 로그인 여부에 따른 이름·로그인 텍스트 분기 */}
      <button
        type="button"
        onClick={() => navigate(nickname ? "/mypage" : "/login")}
        className="cursor-pointer text-base font-bold text-white underline-offset-4 hover:underline active:underline"
      >
        {nickname ? `${nickname}님` : "로그인"}
      </button>
    </header>
  );
}
