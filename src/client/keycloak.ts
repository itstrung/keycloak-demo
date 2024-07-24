"use client";
import { type KeycloakConfig } from "keycloak-js";

export const keycloakConfig: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL ?? "",
  realm: process.env.NEXT_PUBLIC_REALM_NAME ?? "",
  clientId: process.env.NEXT_PUBLIC_WEB_CLIENT_ID ?? "",
} as const;
