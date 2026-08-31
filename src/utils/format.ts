// 천 단위 콤마 표기
export const formatNumber = (value: number) => Math.round(value).toLocaleString("ko-KR");

// 만원 단위 표기
export const formatManWon = (value: number) => `${formatNumber(value / 10000)}만원`;

// 만·천 단위 한글 표기
export const formatManCheonWon = (value: number) => {
  const man = Math.floor(value / 10000);
  const cheon = Math.floor((value % 10000) / 1000);

  return cheon === 0 ? `${formatNumber(man)}만 원` : `${formatNumber(man)}만 ${cheon}천 원`;
};

// 원 단위 표기
export const formatWon = (value: number) => `${formatNumber(value)}원`;

// 근속월수 표기
export const formatServiceMonths = (months: number) =>
  `${formatNumber(months)}개월(${Math.floor(months / 12)}년)`;

// YYYY.MM.DD 표기
export const formatDate = (date: Date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")}`;
