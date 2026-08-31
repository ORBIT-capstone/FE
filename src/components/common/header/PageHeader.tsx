import { useNavigate } from "react-router-dom";
import ChevronIcon from "@/components/common/icon/ChevronIcon";

interface PageHeaderProps {
  title: string;
}

// 세부 페이지 공통 헤더
export default function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-4 pt-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-back-bg text-back-icon"
      >
        <ChevronIcon direction="left" className="size-5" />
      </button>

      <h1 className="text-xl font-bold text-white">{title}</h1>
    </header>
  );
}
