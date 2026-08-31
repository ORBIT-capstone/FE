import { axiosInstance } from "@/api/axiosInstance";
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  SignupRequest,
  UpdateMeRequest,
  UserResponse,
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

export const getMe = async () => {
  const { data } = await axiosInstance.get<UserResponse>("/api/users/me");

  return data;
};

export const updateMe = async (request: UpdateMeRequest) => {
  const { data } = await axiosInstance.patch<UserResponse>("/api/users/me", request);

  return data;
};

export const deleteAccount = async () => {
  await axiosInstance.delete("/api/users/me");
};
