import PageHeader from "@/components/common/header/PageHeader";
import Loading from "@/components/common/Loading";

interface ResultPlaceholderProps {
  title: string;
  message: string;
  // 로딩 중이면 스피너로 표시
  isLoading?: boolean;
}

// 결과 로딩·에러 상태 안내 화면
export default function ResultPlaceholder({
  title,
  message,
  isLoading = false,
}: ResultPlaceholderProps) {
  return (
    <div className="min-h-svh w-full bg-bg-base">
      <div className="mx-auto flex min-h-svh w-full max-w-97.5 flex-col px-7 pb-page-safe">
        <PageHeader title={title} />

        {isLoading ? (
          <Loading message={message} />
        ) : (
          <p className="mt-20 text-center text-sm leading-relaxed whitespace-pre-line text-muted">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
