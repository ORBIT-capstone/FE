import profileCharacter from "@/assets/icons/loginProfile.svg";
import Button from "@/components/common/button/Button";
import type { Profile } from "@/stores/profileStore";

const GENDER_LABEL: Record<Profile["gender"], string> = {
  male: "남성",
  female: "여성",
};

interface ProfileCardProps {
  profile: Profile;
  onEditClick: () => void;
}

export default function ProfileCard({ profile, onEditClick }: ProfileCardProps) {
  return (
    <section className="flex flex-col items-center rounded-2xl border border-white/10 bg-card px-5 py-8">
      <div className="size-28 overflow-hidden rounded-full border-2 border-btn-active bg-bg-base">
        <img src={profileCharacter} alt="" className="size-full object-cover" />
      </div>

      <h2 className="mt-4 text-xl font-bold text-white">{profile.name}</h2>

      <p className="mt-1 text-sm text-neutral-400">{profile.birthDate}</p>

      <span className="mt-3 rounded-full bg-btn-active px-4 py-1 text-xs font-bold text-bg-base">
        {GENDER_LABEL[profile.gender]}
      </span>

      <Button variant="pill" onClick={onEditClick} className="mt-6">
        프로필 수정하기
      </Button>
    </section>
  );
}
