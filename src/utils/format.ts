// 천 단위 콤마 표기
export const formatNumber = (value: number) => Math.round(value).toLocaleString("ko-KR");

// 만원 단위 표기
export const formatManWon = (value: number) => `${formatNumber(value / 10000)}만원`;

// 근속월수 구간 표기
export const formatServicePeriod = (years: number) => `${years * 12}개월(${years}년)`;
