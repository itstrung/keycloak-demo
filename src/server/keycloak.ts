import { keycloakServerClientConfig } from "@/server/schema";
import { Maybe } from "@/types";
import { z } from "zod";

const KEYCLOAK_GET_TOKEN_URL = `${keycloakServerClientConfig.keycloakUrl}/realms/${keycloakServerClientConfig.realm}/protocol/openid-connect/token`;

const KEYCLOAK_GET_USERINFO_URL = `${keycloakServerClientConfig.keycloakUrl}/realms/${keycloakServerClientConfig.realm}/protocol/openid-connect/userinfo`;

// const response = await fetch(KEYCLOAK_GET_TOKEN_URL, {
//     method: "POST",
//     body: new URLSearchParams({
//       client_id: keycloakServerClientConfig.clientId,
//       client_secret: keycloakServerClientConfig.clientSecret,
//       grant_type: "client_credentials",
//     }),
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

export const getKeycloakUserInfo = async (
  jwtToken: string
): Promise<Maybe<Record<string, unknown>>> => {
  const response = await fetch(KEYCLOAK_GET_USERINFO_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    return [null, new Error("Failed to get user info")];
  }

  const responseText = await response.text();

  const responseJson = JSON.parse(responseText);

  return [z.record(z.unknown()).parse(responseJson), null];
};
