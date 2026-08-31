import SegmentedToggle from "@/components/common/toggle/SegmentedToggle";
import type { SegmentedToggleItem } from "@/components/common/toggle/SegmentedToggle";
import type { UserType } from "@/stores/userTypeStore";

const TOGGLE_ITEMS: SegmentedToggleItem<UserType>[] = [
  { label: "재직자", value: "employed" },
  { label: "퇴직자", value: "retired" },
];

interface UserTypeToggleProps {
  value: UserType;
  onChange: (userType: UserType) => void;
}

export default function UserTypeToggle({ value, onChange }: UserTypeToggleProps) {
  return (
    <SegmentedToggle
      items={TOGGLE_ITEMS}
      value={value}
      onChange={onChange}
      itemClassName="h-16"
      // 퇴직자 화면은 민트 계열
      tone={value === "retired" ? "mint" : "primary"}
    />
  );
}
