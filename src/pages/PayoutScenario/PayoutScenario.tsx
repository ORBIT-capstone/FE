import { useNavigate } from "react-router-dom";
import ageIcon from "@/assets/icons/ageIcon.svg";
import assetIcon from "@/assets/icons/assetIcon.svg";
import expenseIcon from "@/assets/icons/expenseIcon.svg";
import genderFemaleIcon from "@/assets/icons/genderFemaleIcon.svg";
import genderMaleIcon from "@/assets/icons/genderMaleIcon.svg";
import Button from "@/components/common/button/Button";
import ChipGroup from "@/components/common/chip/ChipGroup";
import type { ChipItem } from "@/components/common/chip/ChipGroup";
import PageHeader from "@/components/common/header/PageHeader";
import MyInfoCard from "@/components/common/card/MyInfoCard";
import type { MyInfoItem } from "@/components/common/card/MyInfoCard";
import { MOCK_MONTHLY_PENSION } from "@/mocks/payoutScenario";
import { usePayoutScenarioStore } from "@/stores/payoutScenarioStore";
import { useProfileStore } from "@/stores/profileStore";
import { calculateAge } from "@/utils/age";
import { formatManWon } from "@/utils/format";

const EARLY_YEAR_ITEMS: ChipItem<number>[] = [1, 2, 3, 4, 5].map((year) => ({
  label: `${year}년`,
  value: year,
}));

const GENDER_LABEL = { male: "남성", female: "여성" };

// 성별에 따른 아이콘 분기
const GENDER_ICON = { male: genderMaleIcon, female: genderFemaleIcon };

export default function PayoutScenario() {
  const navigate = useNavigate();
  const profile = useProfileStore((state) => state.profile);
  const privateInfo = useProfileStore((state) => state.privateInfo);
  const earlyYears = usePayoutScenarioStore((state) => state.earlyYears);
  const setEarlyYears = usePayoutScenarioStore((state) => state.setEarlyYears);

  // 마이페이지 저장값 기반 내 정보
  const myInfoItems: [MyInfoItem, MyInfoItem, MyInfoItem, MyInfoItem] = [
    { icon: ageIcon, label: "현재 나이", value: `${calculateAge(profile.birthDate)}세` },
    { icon: assetIcon, label: "보유 자산", value: formatManWon(Number(privateInfo.assets)) },
    {
      icon: expenseIcon,
      label: "월 생활비",
      value: formatManWon(Number(privateInfo.monthlyExpense)),
    },
    { icon: GENDER_ICON[profile.gender], label: "성별", value: GENDER_LABEL[profile.gender] },
  ];

  return (
    <div className="min-h-dvh w-full bg-bg-base">
      <div className="mx-auto flex min-h-dvh w-full max-w-97.5 flex-col px-7 pb-10">
        <PageHeader title="수령방식별 시나리오 비교" />

        <p className="mt-4 text-sm leading-relaxed text-muted">
          정상·조기·일시금·분할 수령에 따른 자산 변화를 비교하고, 나에게 맞는 수령 방식을
          확인해보세요.
        </p>

        <div className="mt-8">
          <MyInfoCard items={myInfoItems} onEditClick={() => navigate("/mypage/private-info")} />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">예상 월 연금</h2>
          <p className="text-lg font-bold text-btn-active">{MOCK_MONTHLY_PENSION}만원</p>
        </div>

        <div className="mt-8">
          <h2 className="text-base font-bold text-white">조기수령 연수 선택</h2>
          <p className="mt-2 text-sm text-muted">몇 년 일찍 연금을 수령할지 선택해주세요</p>

          <div className="mt-4">
            <ChipGroup items={EARLY_YEAR_ITEMS} value={earlyYears} onChange={setEarlyYears} />
          </div>
        </div>

        <Button onClick={() => navigate("/payout-scenario/result")} className="mt-auto">
          시나리오 비교하기
        </Button>
      </div>
    </div>
  );
}
