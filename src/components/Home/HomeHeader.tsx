import loginProfile from "@/assets/icons/loginProfile.svg";
import logoutProfile from "@/assets/icons/logoutProfile.svg";
import logo from "@/assets/images/logo.svg";
import { useAuthStore } from "@/stores/authStore";

export default function HomeHeader() {
  // 로그인 여부에 따른 프로필 아이콘 분기
  const isLoggedIn = useAuthStore((state) => state.user) !== null;

  return (
    <header className="flex items-center justify-between pt-8">
      <img src={logo} alt="ORBIT" className="h-12 w-auto" />

      <button type="button" aria-label="프로필">
        <img src={isLoggedIn ? loginProfile : logoutProfile} alt="" className="size-12" />
      </button>
    </header>
  );
}
