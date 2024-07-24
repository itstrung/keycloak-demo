"use client";

import { callLogoutAPI } from "@/client/api";
import { keycloakWebClientAtom } from "@/client/atom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constant/route";
import { useAtom } from "jotai";

type LogoutButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const LogoutButton = ({ ...props }: LogoutButtonProps) => {
  const [keycloakWebClient] = useAtom(keycloakWebClientAtom);

  const onLogout = async () => {
    const loginUrl = new URL(ROUTES.LOGIN, window.location.origin);
    await keycloakWebClient?.logout({
      redirectUri: loginUrl.toString(),
    });

    callLogoutAPI();
  };
  return (
    <>
      <Button variant="destructive" onClick={onLogout} {...props}>
        Logout
      </Button>
    </>
  );
};
