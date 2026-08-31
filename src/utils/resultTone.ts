// 결과 화면 색상 계열, 진단은 핑크 재취업 감액은 민트
export type ResultTone = "pink" | "mint" | "yellow";

export interface ResultToneStyle {
  // 원형 게이지 그라데이션 시작·끝 색상
  gaugeFrom: string;
  gaugeTo: string;
  // 강조 문구 그라데이션 클래스
  headlineClass: string;
  // 강조 수치 색상 클래스
  accentClass: string;
  // 자산 변화 그래프 라인 색상
  chart: { asset: string; cumulative: string };
}

export const RESULT_TONE: Record<ResultTone, ResultToneStyle> = {
  pink: {
    gaugeFrom: "#de8c98",
    gaugeTo: "#de5481",
    headlineClass: "text-gradient-score",
    accentClass: "text-btn-active",
    chart: { asset: "#de8c98", cumulative: "#8b8fd9" },
  },
  mint: {
    gaugeFrom: "#2cffa8",
    gaugeTo: "#8ad5b6",
    headlineClass: "text-gradient-score-mint",
    accentClass: "text-mint",
    chart: { asset: "#8ad5b6", cumulative: "#8b8fd9" },
  },
  yellow: {
    gaugeFrom: "#ffe9bc",
    gaugeTo: "#fdd58c",
    headlineClass: "text-gradient-score-yellow",
    accentClass: "text-sub-yellow",
    chart: { asset: "#fdd58c", cumulative: "#8b8fd9" },
  },
};
