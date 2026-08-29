import type { UserType } from "@/stores/userTypeStore";

export interface HomeBannerContent {
  title: string;
  descriptions: string[];
  buttonLabel: string;
}

export interface HomeInfoCardContent {
  id: string;
  title: string;
  description: string;
}

export const HOME_BANNERS: Record<UserType, HomeBannerContent> = {
  employed: {
    title: "당신의 연금, 미리 계산해 보세요",
    descriptions: [
      "재직 정보를 입력하시면 예상 월 연금액과",
      "퇴직급여, 은퇴 후 자산 흐름을 보여드립니다",
    ],
    buttonLabel: "연금 시뮬레이션",
  },
  retired: {
    title: "당신의 노후 자산, 충분히 준비되어 있나요?",
    descriptions: [
      "나이, 생활비, 연금과 자산을 입력하면",
      "자산 고갈 시점과 노후 준비 상태를",
      "간편하게 계산해 드립니다.",
    ],
    buttonLabel: "계산하러가기",
  },
};

export const HOME_INFO_CARDS: Record<UserType, HomeInfoCardContent[]> = {
  employed: [
    {
      id: "scenario",
      title: "수령방식별 시나리오 비교",
      description:
        "정상·조기·일시금·분할 수령에 따른 자산 변화를 비교하고, 나에게 맞는 수령 방식을 확인해보세요.",
    },
    {
      id: "improvement",
      title: "노후 준비 개선 추천",
      description: "현재 노후 준비 상태를 진단하고, 필요한 절약 금액과 추가 소득을 확인해보세요.",
    },
  ],
  retired: [
    {
      id: "reemployment",
      title: "재취업 연금 감액 계산",
      description:
        "재취업 후 예상 소득에 따른 연금 감액 여부와 실제 받을 수 있는 금액을 간편하게 계산해보세요.",
    },
    {
      id: "improvement",
      title: "노후 준비 개선 추천",
      description: "현재 노후 준비 상태를 진단하고, 필요한 절약 금액과 추가 소득을 확인해보세요.",
    },
  ],
};
