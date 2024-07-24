import { AUTH_SESSION_COOKIE_NAME } from "@/constant/cookie";
import { cookies } from "next/headers";

export function POST() {
  cookies().delete(AUTH_SESSION_COOKIE_NAME);

  return new Response(null, {
    status: 200,
    statusText: "OK",
  });
}
