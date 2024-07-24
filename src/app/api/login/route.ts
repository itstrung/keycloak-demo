import { AUTH_SESSION_COOKIE_NAME } from "@/constant/cookie";
import { extractIdTokenFromRequest } from "@/server/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  const [idToken] = extractIdTokenFromRequest(request);

  if (!idToken) {
    return new NextResponse(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  cookies().set({
    name: AUTH_SESSION_COOKIE_NAME,
    value: idToken,
    maxAge: 60 * 5,
    httpOnly: true,
    secure: true,
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "OK",
  });
}
