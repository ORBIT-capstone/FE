import axios, { isAxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/authStore";
import type { LoginResponse } from "@/types/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 재발급 대상에서 제외할 인증 경로
const AUTH_FREE_PATHS = ["/api/users/login", "/api/users/signup", "/api/auth/refresh"];

// 재시도 여부 표시용 요청 설정
type RetriableConfig = InternalAxiosRequestConfig & { isRetried?: boolean };

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 액세스 토큰 자동 첨부
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// 재발급 진행 중 요청, 동시 401 을 한 번만 처리
let reissuePromise: Promise<string> | null = null;

const reissueToken = async () => {
  const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();
  if (!refreshToken) throw new Error("리프레시 토큰이 없습니다");

  try {
    const { data } = await axios.post<LoginResponse>(`${BASE_URL}/api/auth/refresh`, {
      refreshToken,
    });

    setTokens(data.accessToken, data.refreshToken);

    return data.accessToken;
  } catch (error) {
    // 재발급 실패 시 로그인 정보 정리
    clearAuth();
    throw error;
  }
};

// 액세스 토큰 만료 시 재발급 후 1회 재시도
axiosInstance.interceptors.response.use(undefined, async (error: unknown) => {
  if (!isAxiosError(error) || error.response?.status !== 401) throw error;

  const config = error.config as RetriableConfig | undefined;
  const isSkipped = AUTH_FREE_PATHS.some((path) => config?.url?.includes(path));

  if (!config || config.isRetried || isSkipped) throw error;
  if (!useAuthStore.getState().refreshToken) throw error;

  config.isRetried = true;
  reissuePromise ??= reissueToken().finally(() => {
    reissuePromise = null;
  });

  const accessToken = await reissuePromise;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return axiosInstance(config);
});
