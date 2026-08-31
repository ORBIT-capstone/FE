import PageHeader from "@/components/common/header/PageHeader";

interface ResultPlaceholderProps {
  title: string;
  message: string;
}

// 결과 로딩·에러 상태 안내 화면
export default function ResultPlaceholder({ title, message }: ResultPlaceholderProps) {
  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title={title} />

        <p className="mt-20 text-center text-sm leading-relaxed whitespace-pre-line text-muted">
          {message}
        </p>
      </div>
    </div>
  );
}
