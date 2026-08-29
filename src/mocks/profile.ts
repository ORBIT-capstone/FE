import type { PrivateInfo, Profile } from "@/stores/profileStore";

export const MOCK_PROFILE: Profile = {
  name: "서후",
  birthDate: "2000-03-15",
  gender: "female",
  email: "seohu@orbit.com",
};

export const MOCK_PRIVATE_INFO: PrivateInfo = {
  assets: "50000000",
  monthlyExpense: "2000000",
  serviceYears: "5",
};
