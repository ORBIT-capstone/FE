import { useState } from "react";

interface CalendarProps {
  // yyyy-mm-dd 형식 선택값
  value: string;
  onSelect: (date: string) => void;
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const toDateString = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function Calendar({ value, onSelect }: CalendarProps) {
  const selectedDate = value ? new Date(value) : new Date();
  // 달력에 표시 중인 연·월
  const [viewDate, setViewDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const moveYear = (diff: number) => setViewDate(new Date(year + diff, month, 1));
  const moveMonth = (diff: number) => setViewDate(new Date(year, month + diff, 1));

  return (
    <div className="absolute top-full right-0 left-0 z-10 mt-2 rounded-xl bg-field p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between text-bg-base">
        <div className="flex">
          <button type="button" onClick={() => moveYear(-1)} aria-label="이전 해" className="px-2">
            {"<<"}
          </button>
          <button type="button" onClick={() => moveMonth(-1)} aria-label="이전 달" className="px-2">
            {"<"}
          </button>
        </div>

        <span className="text-base font-medium">
          {year}년 {month + 1}월
        </span>

        <div className="flex">
          <button type="button" onClick={() => moveMonth(1)} aria-label="다음 달" className="px-2">
            {">"}
          </button>
          <button type="button" onClick={() => moveYear(1)} aria-label="다음 해" className="px-2">
            {">>"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEK_DAYS.map((weekDay) => (
          <span key={weekDay} className="py-1 text-xs text-neutral-400">
            {weekDay}
          </span>
        ))}

        {Array.from({ length: firstWeekDay }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}

        {Array.from({ length: lastDate }, (_, index) => {
          const day = index + 1;
          const dateString = toDateString(year, month, day);
          const isSelected = dateString === value;

          return (
            <button
              key={dateString}
              type="button"
              onClick={() => onSelect(dateString)}
              className={`aspect-square cursor-pointer rounded-md text-sm ${
                isSelected ? "bg-btn-active text-white" : "text-bg-base hover:bg-neutral-200"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
