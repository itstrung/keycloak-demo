import { HeaderLink } from "@/components/Header/HeaderLink";
import { LogoutButton } from "@/components/Logout";
import { Button } from "@/components/ui/button";
import { USER_ROLES } from "@/constant/role";
import { ROUTES } from "@/constant/route";
import { getUserRoles } from "@/lib/utils";
import { getKeycloakUserInfoFromCookie } from "@/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [keycloakUserInfo, error] = await getKeycloakUserInfoFromCookie();

  if (error) {
    redirect(ROUTES.LOGIN);
  }

  const userRoles = getUserRoles(keycloakUserInfo);

  return (
    <>
      <header className="p-4 flex gap-4 items-center">
        <HeaderLink href={ROUTES.HOME} label="Home" />
        <HeaderLink
          isDisabled={!userRoles?.includes(USER_ROLES.HR)}
          href={ROUTES.HUMAN_RESOURCE}
          label="Human Resource"
        />
        <HeaderLink
          isDisabled={!userRoles?.includes(USER_ROLES.SALES)}
          href={ROUTES.SALES}
          label="Sales"
        />
        <div className="ml-auto flex gap-4">
          <Link className="" href={ROUTES.PROFILE}>
            <Button>Profile</Button>
          </Link>
          <LogoutButton className="" />
        </div>
      </header>

      <main className="flex flex-col items-center justify-between p-8">
        {children}
      </main>
    </>
  );
}
