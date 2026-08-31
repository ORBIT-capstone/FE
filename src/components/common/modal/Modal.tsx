export type ModalVariant = "double" | "single";

interface ModalProps {
  isOpen: boolean;
  // 줄바꿈 포함 안내 문구
  message: string;
  cancelLabel?: string;
  confirmLabel: string;
  // 버튼 구성, single 은 확인 버튼만 노출
  variant?: ModalVariant;
  onCancel: () => void;
  onConfirm: () => void;
}

// 공용 확인 팝업
export default function Modal({
  isOpen,
  message,
  cancelLabel = "취소",
  confirmLabel,
  variant = "double",
  onCancel,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-10"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-80 overflow-hidden rounded-2xl bg-white"
      >
        <p className="px-6 py-9 text-center text-base leading-relaxed font-medium whitespace-pre-line text-bg-base">
          {message}
        </p>

        {variant === "single" ? (
          <div className="px-8 pb-8">
            <button
              type="button"
              onClick={onConfirm}
              className="h-12 w-full cursor-pointer rounded-full border border-bg-base text-base font-bold text-bg-base"
            >
              {confirmLabel}
            </button>
          </div>
        ) : (
          <div className="flex border-t border-neutral-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 cursor-pointer py-4 text-base text-neutral-400"
            >
              {cancelLabel}
            </button>

            <span className="w-px bg-neutral-200" />

            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 cursor-pointer py-4 text-base font-bold text-bg-base"
            >
              {confirmLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
