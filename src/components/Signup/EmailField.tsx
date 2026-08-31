import { useState } from "react";
import type { ChangeEvent } from "react";
import ChevronIcon from "@/components/common/icon/ChevronIcon";
import Input from "@/components/common/input/Input";
import Select from "@/components/common/select/Select";
import { DIRECT_INPUT_VALUE, EMAIL_DOMAINS } from "@/mocks/emailDomains";

interface EmailFieldProps {
  emailId: string;
  emailDomain: string;
  onEmailIdChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEmailDomainChange: (domain: string) => void;
}

export default function EmailField({
  emailId,
  emailDomain,
  onEmailIdChange,
  onEmailDomainChange,
}: EmailFieldProps) {
  // 도메인 직접 입력 모드 여부
  const [isDirectInput, setIsDirectInput] = useState(false);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === DIRECT_INPUT_VALUE) {
      setIsDirectInput(true);
      onEmailDomainChange("");
      return;
    }

    onEmailDomainChange(value);
  };

  // 도메인 목록 선택 모드로 복귀 처리
  const handleBackToSelect = () => {
    setIsDirectInput(false);
    onEmailDomainChange("");
  };

  return (
    <div>
      <span className="mb-2 block text-base font-medium text-white">이메일 / email</span>

      <div className="flex items-center gap-2">
        <Input
          className="flex-1"
          type="text"
          value={emailId}
          onChange={onEmailIdChange}
          autoComplete="email"
          aria-label="이메일 아이디"
        />

        <span className="text-base text-white">@</span>

        {isDirectInput ? (
          <div className="relative w-27">
            <input
              type="text"
              value={emailDomain}
              onChange={(event) => onEmailDomainChange(event.target.value)}
              placeholder="직접 입력"
              aria-label="이메일 도메인 직접 입력"
              className="h-14 w-full rounded-xl bg-field pr-10 pl-4 text-base text-bg-base outline-none placeholder:text-neutral-400"
            />

            <button
              type="button"
              onClick={handleBackToSelect}
              aria-label="도메인 목록으로 돌아가기"
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-bg-base"
            >
              <ChevronIcon direction="up" />
            </button>
          </div>
        ) : (
          <Select
            className="w-27"
            options={EMAIL_DOMAINS}
            value={emailDomain}
            onChange={handleSelectChange}
            aria-label="이메일 도메인"
          />
        )}
      </div>
    </div>
  );
}
