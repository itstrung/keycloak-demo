import "server-only";

import { AUTH_SESSION_COOKIE_NAME } from "@/constant/cookie";
import { cookies } from "next/headers";
import { getKeycloakUserInfo } from "@/server/keycloak";
import { isNil } from "lodash";
import type { Maybe } from "@/types";

export const checkValidSession = async (): Promise<boolean> => {
  const authSessionCookie = cookies().get(AUTH_SESSION_COOKIE_NAME);

  if (!authSessionCookie) {
    return false;
  }

  const [keycloakUserInfo] = await getKeycloakUserInfo(authSessionCookie.value);

  return !isNil(keycloakUserInfo);
};

export const getKeycloakUserInfoFromCookie = async (): Promise<
  Maybe<Record<string, unknown>>
> => {
  const authSessionCookie = cookies().get(AUTH_SESSION_COOKIE_NAME);

  if (!authSessionCookie) {
    return [null, new Error("No session cookie")];
  }

  return await getKeycloakUserInfo(authSessionCookie.value);
};
