import { preProcessSnakeToCamel } from "@/lib/utils";
import { z } from "zod";

const KeycloakServerClientConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  realm: z.string(),
  keycloakUrl: z.string(),
});

const KeycloakWebClientConfigSchema = z.object({
  realm: z.string(),
  clientId: z.string(),
  keycloakUrl: z.string(),
});

export const keycloakServerClientConfig =
  KeycloakServerClientConfigSchema.parse({
    clientId: process.env.KEYCLOAK_SERVER_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_SERVER_CLIENT_SECRET,
    realm: process.env.NEXT_PUBLIC_REALM_NAME,
    keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  });

export const keycloakWebClientConfig = KeycloakWebClientConfigSchema.parse({
  realm: process.env.NEXT_PUBLIC_REALM_NAME,
  clientId: process.env.NEXT_PUBLIC_WEB_CLIENT_ID,
  keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
});

export const KeycloakRolesSchema = z.record(z.array(z.string()));

export const ResourceAccessSchema = z.record(KeycloakRolesSchema);

export const keycloakUserInfoSchema = preProcessSnakeToCamel(
  z.object({
    sub: z.string(),
    emailVerified: z.boolean().nullish(),
    name: z.string().nullish(),
    preferredUsername: z.string().nullish(),
    givenName: z.string().nullish(),
    familyName: z.string().nullish(),
    email: z.string().nullish(),
    resourceAccess: ResourceAccessSchema.nullish(),
  })
);

export type KeycloakUserInfo = z.infer<typeof keycloakUserInfoSchema>;
