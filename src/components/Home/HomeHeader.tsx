import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { useAuthStore } from "@/stores/authStore";

export default function HomeHeader() {
  const navigate = useNavigate();
  const name = useAuthStore((state) => state.user?.name);

  return (
    <header className="flex items-center justify-between pt-8">
      <img src={logo} alt="ORBIT" className="h-16 w-auto" />

      {/* 로그인 여부에 따른 이름·로그인 텍스트 분기 */}
      <button
        type="button"
        onClick={() => navigate(name ? "/mypage" : "/login")}
        className="cursor-pointer text-lg font-semibold text-white underline-offset-4 hover:underline active:underline"
      >
        {name ? `${name}님` : "로그인"}
      </button>
    </header>
  );
}
