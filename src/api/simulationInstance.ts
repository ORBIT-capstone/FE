import axios from "axios";

// 시뮬레이션 전용 인스턴스, 회원 API 와 다른 서버 사용
export const simulationInstance = axios.create({
  baseURL: import.meta.env.VITE_FAST_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
