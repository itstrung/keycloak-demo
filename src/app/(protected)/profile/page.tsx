import { UserInfo } from "@/components/UserInfo";
import { ROUTES } from "@/constant/route";
import { getKeycloakUserInfoFromCookie } from "@/server";
import { redirect } from "next/navigation";

export default async function UserInfoPage() {
  const [keycloakUserInfo, error] = await getKeycloakUserInfoFromCookie();

  if (error) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <main>
      <UserInfo
        key={(keycloakUserInfo?.["sub"] as string) ?? undefined}
        keycloakUserInfo={keycloakUserInfo}
      />
    </main>
  );
}
