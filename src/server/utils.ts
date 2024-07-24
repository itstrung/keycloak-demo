import { Maybe } from "@/types";
import { NextRequest } from "next/server";

export const extractIdTokenFromRequest = (
  request: NextRequest
): Maybe<string> => {
  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    return [null, new Error("Authorization header not found")];
  }

  if (!authorization.startsWith("Bearer ")) {
    return [null, new Error("Invalid Authorization header")];
  }

  const idToken = authorization.split("Bearer ").at(1);

  if (!idToken) {
    return [null, new Error("Invalid idToken")];
  }

  return [idToken, null];
};
