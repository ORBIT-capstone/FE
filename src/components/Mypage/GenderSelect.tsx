import SegmentedToggle from "@/components/common/toggle/SegmentedToggle";
import type { SegmentedToggleItem } from "@/components/common/toggle/SegmentedToggle";
import type { Gender } from "@/stores/profileStore";

const GENDER_ITEMS: SegmentedToggleItem<Gender>[] = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

interface GenderSelectProps {
  value: Gender;
  onChange: (gender: Gender) => void;
}

export default function GenderSelect({ value, onChange }: GenderSelectProps) {
  return (
    <div>
      <span className="mb-2 block text-base font-medium text-white">성별</span>
      <SegmentedToggle items={GENDER_ITEMS} value={value} onChange={onChange} />
    </div>
  );
}
