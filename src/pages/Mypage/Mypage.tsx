import { useNavigate } from "react-router-dom";
import myPlanIcon from "@/assets/icons/MyPlanIcon.svg";
import privateInfoIcon from "@/assets/icons/privateInfoIcon.svg";
import InfoCard from "@/components/common/card/InfoCard";
import ProfileCard from "@/components/Mypage/ProfileCard";
import { useProfileStore } from "@/stores/profileStore";

export default function Mypage() {
  const navigate = useNavigate();
  const profile = useProfileStore((state) => state.profile);

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto w-full max-w-97.5 px-7 pb-28">
        <h1 className="pt-8 text-xl font-bold text-white">마이페이지</h1>
        <div className="mt-4 h-0.5 rounded-full bg-btn-active" />

        <div className="mt-6">
          <ProfileCard profile={profile} onEditClick={() => navigate("/mypage/profile")} />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <InfoCard
            icon={<img src={privateInfoIcon} alt="" className="size-7" />}
            title="개인정보 수정"
            onClick={() => navigate("/mypage/private-info")}
          />

          {/* 마이플랜 화면 미구현 상태 */}
          <InfoCard icon={<img src={myPlanIcon} alt="" className="size-7" />} title="마이플랜" />
        </div>
      </div>
    </div>
  );
}
