import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myPlanIcon from "@/assets/icons/MyPlanIcon.svg";
import privateInfoIcon from "@/assets/icons/privateInfoIcon.svg";
import InfoCard from "@/components/common/card/InfoCard";
import BottomSheet from "@/components/common/modal/BottomSheet";
import LoginRequiredModal from "@/components/common/modal/LoginRequiredModal";
import Modal from "@/components/common/modal/Modal";
import ProfileCard from "@/components/Mypage/ProfileCard";
import useLoginGuard from "@/hooks/useLoginGuard";
import useDeleteAccountMutation from "@/queries/auth/useDeleteAccountMutation";
import useLogoutMutation from "@/queries/auth/useLogoutMutation";
import { useAuthStore } from "@/stores/authStore";
import { useDiagnosisStore } from "@/stores/diagnosisStore";
import { useReemploymentStore } from "@/stores/reemploymentStore";

// 회원탈퇴 안내 문구
const WITHDRAW_DESCRIPTION =
  "탈퇴 시 계정 및 이용 기록은 모두 삭제되며,\n삭제된 데이터는 복구가 불가능합니다.\n또한 탈퇴 후 동일 계정으로 재가입 시\n제한을 받을 수 있습니다.\n탈퇴를 진행할까요?";

export default function Mypage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearDiagnosis = useDiagnosisStore((state) => state.clearDiagnosis);
  const clearReemployment = useReemploymentStore((state) => state.clearReemployment);
  const { isLoggedIn, goLogin } = useLoginGuard();
  const { mutate: logoutMutate } = useLogoutMutation();
  const { mutate: deleteAccountMutate } = useDeleteAccountMutation();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // 계산 결과 전역 상태 초기화
  const clearSavedData = () => {
    clearDiagnosis();
    clearReemployment();
  };

  // 로그아웃 처리, 실패해도 홈으로 이동
  const handleLogout = () => logoutMutate(undefined, { onSettled: () => navigate("/") });

  // 회원탈퇴 처리, 저장 내역까지 초기화
  const handleWithdraw = () =>
    deleteAccountMutate(undefined, {
      onSuccess: () => {
        clearSavedData();
        navigate("/");
      },
      onError: () => setIsWithdrawOpen(false),
    });

  // 로그아웃 상태 진입 시 로그인 유도
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-dvh w-full bg-bg-base">
        <LoginRequiredModal isOpen onCancel={() => navigate("/")} onConfirm={goLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      {/* 화면 폭 전체를 채우는 헤더 구분선 */}
      <header className="mx-auto w-full max-w-97.5">
        <h1 className="pt-14 text-center text-xl font-bold text-white">마이페이지</h1>
        <div className="mt-4 h-1.75 bg-btn-active" />
      </header>

      <div className="mx-auto flex w-full max-w-97.5 flex-col px-7 pb-28">
        <div className="mt-10">
          <ProfileCard user={user} onEditClick={() => navigate("/mypage/profile")} />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <InfoCard
            icon={
              <span className="flex size-11 items-center justify-center rounded-full bg-white">
                <img src={privateInfoIcon} alt="" className="size-6" />
              </span>
            }
            title="개인정보 수정"
            onClick={() => navigate("/mypage/private-info")}
          />

          <InfoCard
            icon={
              <span className="flex size-11 items-center justify-center rounded-full bg-white">
                <img src={myPlanIcon} alt="" className="size-6" />
              </span>
            }
            title="마이플랜"
            onClick={() => navigate("/mypage/plan")}
          />
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 text-sm text-muted">
          <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className={`cursor-pointer underline-offset-4 hover:underline active:underline ${
              isLogoutOpen ? "underline" : ""
            }`}
          >
            로그아웃
          </button>

          <span>|</span>

          <button
            type="button"
            onClick={() => setIsWithdrawOpen(true)}
            className={`cursor-pointer underline-offset-4 hover:underline active:underline ${
              isWithdrawOpen ? "underline" : ""
            }`}
          >
            회원탈퇴
          </button>
        </div>
      </div>

      <Modal
        isOpen={isLogoutOpen}
        message="로그아웃 하시겠습니까?"
        confirmLabel="확인"
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />

      <BottomSheet
        isOpen={isWithdrawOpen}
        title="잠깐만요"
        description={WITHDRAW_DESCRIPTION}
        confirmLabel="탈퇴할게요"
        cancelLabel="취소"
        onConfirm={handleWithdraw}
        onCancel={() => setIsWithdrawOpen(false)}
      />
    </div>
  );
}
