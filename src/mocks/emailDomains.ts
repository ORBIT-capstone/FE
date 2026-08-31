import type { SelectOption } from "@/components/common/select/Select";

// 도메인 직접 입력 선택값
export const DIRECT_INPUT_VALUE = "direct";

export const EMAIL_DOMAINS: SelectOption[] = [
  { label: "gmail.com", value: "gmail.com" },
  { label: "naver.com", value: "naver.com" },
  { label: "daum.net", value: "daum.net" },
  { label: "hanmail.net", value: "hanmail.net" },
  { label: "kakao.com", value: "kakao.com" },
  { label: "nate.com", value: "nate.com" },
  { label: "outlook.com", value: "outlook.com" },
  { label: "직접 입력", value: DIRECT_INPUT_VALUE },
];
