import { axiosInstance } from "@/api/axiosInstance";
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  SignupRequest,
} from "@/types/auth";

export const signup = async (request: SignupRequest) => {
  await axiosInstance.post("/api/users/signup", request);
};

export const login = async (request: LoginRequest) => {
  const { data } = await axiosInstance.post<LoginResponse>("/api/users/login", request);

  return data;
};

export const logout = async (request: LogoutRequest) => {
  await axiosInstance.post("/api/users/logout", request);
};

// 토큰 재발급, 인터셉터 외 직접 호출용
export const reissue = async (request: RefreshTokenRequest) => {
  const { data } = await axiosInstance.post<LoginResponse>("/api/auth/refresh", request);

  return data;
};
