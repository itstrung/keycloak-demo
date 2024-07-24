import { API_ROUTES } from "@/constant/route";

export const callLoginAPI = async (token: string) => {
  return fetch(API_ROUTES.LOGIN, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const callLogoutAPI = async () => {
  return fetch(API_ROUTES.LOGOUT, {
    method: "POST",
  });
};
