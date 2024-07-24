"use client";

import { keycloakWebClientAtom } from "@/client/atom";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";

export const LoginButton = () => {
  const [keycloakWebClient] = useAtom(keycloakWebClientAtom);
  const onLogin = () => {
    keycloakWebClient?.login();
  };

  return (
    <>
      <Button onClick={onLogin}>Login</Button>
    </>
  );
};
