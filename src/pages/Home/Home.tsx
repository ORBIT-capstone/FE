import HomeHeader from "@/components/Home/HomeHeader";
import StarBackground from "@/components/common/StarBackground";
import UserTypeToggle from "@/components/Home/UserTypeToggle";
import EmployedHome from "@/pages/Home/EmployedHome";
import RetiredHome from "@/pages/Home/RetiredHome";
import { useAuthStore } from "@/stores/authStore";
import { useUserTypeStore } from "@/stores/userTypeStore";

export default function Home() {
  const name = useAuthStore((state) => state.user?.name);
  const userType = useUserTypeStore((state) => state.userType);
  const setUserType = useUserTypeStore((state) => state.setUserType);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-bg-base">
      <StarBackground />

      <div className="relative mx-auto w-full max-w-97.5 px-7 pb-28">
        <HomeHeader />

        {/* 로그인 여부에 따른 인사말 분기 */}
        <h1 className="mt-10 text-2xl font-bold text-white">
          {name ? `안녕하세요, ${name}님` : "어서오세요, ORBIT입니다"}
        </h1>
        <p className="mt-1.5 text-base text-white">
          {name
            ? "변화하는 미래를 지속적으로 확인해보세요"
            : "당신의 내일을 더 선명하게 설계해보세요"}
        </p>

        <div className="mt-6">
          <UserTypeToggle value={userType} onChange={setUserType} />
        </div>

        <div className="mt-6">{userType === "employed" ? <EmployedHome /> : <RetiredHome />}</div>
      </div>
    </div>
  );
}
