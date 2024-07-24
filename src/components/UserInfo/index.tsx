"use client";

import { keycloakWebClientAtom } from "@/client/atom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useAtom } from "jotai";

const orderObject = (obj: Record<string, unknown> | null | undefined) => {
  if (!obj) {
    return {};
  }
  return Object.keys(obj)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};

export const UserInfo = ({
  keycloakUserInfo,
}: {
  keycloakUserInfo: Record<string, unknown>;
}) => {
  const [kcClient] = useAtom(keycloakWebClientAtom);

  if (!kcClient) {
    return null;
  }

  const tokenParsed = kcClient.tokenParsed;
  const idTokenParsed = kcClient.idTokenParsed;

  if (!tokenParsed || !idTokenParsed) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden max-w-screen-2xl whitespace-nowrap">
      <div className="flex justify-center gap-2">
        <Card className="p-2">
          <CardTitle>Access Token</CardTitle>
          <CardDescription className="py-2">
            <p>Provided via successful login</p>
            <p>
              For <strong>authorization</strong> purposes: read and validated by
              the API
            </p>
          </CardDescription>
          <CardContent>
            <pre className="text-xs">
              {JSON.stringify(orderObject(kcClient?.tokenParsed), undefined, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardTitle>ID Token</CardTitle>
          <CardDescription className="py-2">
            <p>Provided via successful login</p>
            <p>
              For <strong>authentication</strong> purposes: read by public
              clients
            </p>
          </CardDescription>
          <CardContent>
            <pre className="text-xs">
              {JSON.stringify(
                orderObject(kcClient?.idTokenParsed),
                undefined,
                2
              )}
            </pre>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardTitle>User Info</CardTitle>
          <CardDescription className="py-2">
            <p>/userinfo API response</p>
            <p>Additional user data</p>
          </CardDescription>
          <CardContent>
            <pre className="text-xs">
              {JSON.stringify(orderObject(keycloakUserInfo), undefined, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>

      <Button
        className="max-w-24 mt-4"
        onClick={() => {
          kcClient.accountManagement();
        }}
      >
        Edit Profile
      </Button>
    </div>
  );
};
