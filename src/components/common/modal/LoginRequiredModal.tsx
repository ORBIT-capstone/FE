import Modal from "@/components/common/modal/Modal";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

// 로그아웃 상태 기능 접근 시 로그인 유도 팝업
export default function LoginRequiredModal({
  isOpen,
  onCancel,
  onConfirm,
}: LoginRequiredModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      message={"로그인하고 ORBIT의\n다양한 서비스를 이용해보세요."}
      confirmLabel="로그인하기"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
