"use client";
import { callLoginAPI } from "@/client/api";
import { keycloakWebClientAtom } from "@/client/atom";
import { keycloakConfig } from "@/client/keycloak";
import { ROUTES } from "@/constant/route";
import { useAtom } from "jotai";
import Keycloak from "keycloak-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const KeycloakComponent = () => {
  const isKeycloakInitialized = useRef(false);
  const [, setKeycloakWebClient] = useAtom(keycloakWebClientAtom);
  const router = useRouter();

  useEffect(() => {
    if (isKeycloakInitialized.current) {
      return;
    }

    isKeycloakInitialized.current = true;

    const keycloakWebClient = new Keycloak(keycloakConfig);

    const onLoginSuccess = async () => {
      if (!keycloakWebClient?.token) {
        return;
      }

      await callLoginAPI(keycloakWebClient.token);
      router.push(ROUTES.HOME);
    };

    const onTokenExpired = async () => {
      try {
        const isRefreshed = await keycloakWebClient.updateToken();

        if (isRefreshed) {
          await onLoginSuccess();
        }
      } catch (e) {
        keycloakWebClient.login();
      }
    };

    keycloakWebClient.onAuthSuccess = onLoginSuccess;
    keycloakWebClient.onTokenExpired = onTokenExpired;

    setKeycloakWebClient(keycloakWebClient);

    keycloakWebClient
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (!authenticated) {
          // Turn this on for auto login
          // keycloakWebClient.login();
          return;
        }
        console.log("Keycloak authenticated");
        setKeycloakWebClient(keycloakWebClient);
      });
  }, [router, setKeycloakWebClient]);

  return <></>;
};
