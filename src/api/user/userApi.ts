import { axiosInstance } from "@/api/axiosInstance";
import type { UpdateUserRequest, UserResponse } from "@/types/user";

export const getMe = async () => {
  const { data } = await axiosInstance.get<UserResponse>("/api/users/me");

  return data;
};

export const updateMe = async (request: UpdateUserRequest) => {
  const { data } = await axiosInstance.patch<UserResponse>("/api/users/me", request);

  return data;
};

export const deleteMe = async () => {
  await axiosInstance.delete("/api/users/me");
};
