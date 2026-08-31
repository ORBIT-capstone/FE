import profileCharacter from "@/assets/icons/loginProfile.svg";
import type { AuthUser } from "@/types/user";

const GENDER_LABEL: Record<AuthUser["gender"], string> = {
  male: "남성",
  female: "여성",
};

interface ProfileCardProps {
  user: AuthUser;
  onEditClick: () => void;
}

export default function ProfileCard({ user, onEditClick }: ProfileCardProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-card px-5 py-5">
      <div className="flex items-center gap-4">
        <div className="size-24 shrink-0 overflow-hidden rounded-full bg-bg-base">
          <img src={profileCharacter} alt="" className="size-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate text-xl font-bold text-white">{user.name}</h2>

            <span className="shrink-0 rounded-full bg-white px-4 py-1 text-xs font-bold text-bg-base">
              {GENDER_LABEL[user.gender]}
            </span>
          </div>

          <p className="mt-2 text-xl font-bold text-white">{user.birthDate.replace(/-/g, ".")}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditClick}
        className="mt-5 h-12 w-full cursor-pointer rounded-xl bg-btn-neutral text-sm font-bold text-white"
      >
        프로필 수정하기
      </button>
    </section>
  );
}
