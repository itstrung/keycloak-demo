import { atom } from "jotai";
import Keycloak from "keycloak-js";

export const keycloakWebClientAtom = atom<Keycloak | null>(null);
