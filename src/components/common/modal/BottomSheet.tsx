interface BottomSheetProps {
  isOpen: boolean;
  title: string;
  // 줄바꿈 포함 안내 문구
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// 하단에서 올라오는 확인 시트
export default function BottomSheet({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/60"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-97.5 rounded-t-3xl bg-white px-7 pt-8 pb-10"
      >
        <h2 className="text-center text-xl font-bold text-bg-base">{title}</h2>

        <p className="mt-6 text-center text-sm leading-relaxed whitespace-pre-line text-neutral-500">
          {description}
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-8 h-14 w-full cursor-pointer rounded-full bg-btn-active text-base font-bold text-bg-base"
        >
          {confirmLabel}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="mt-3 h-14 w-full cursor-pointer rounded-full border border-neutral-300 text-base font-bold text-bg-base"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
