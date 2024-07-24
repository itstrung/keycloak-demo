import { type ClassValue, clsx } from "clsx";
import { camelCase, isPlainObject } from "lodash";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snakeToCamel = <
  TBefore extends Record<string, unknown>,
  TAfter extends Record<string, unknown>
>(
  obj: TBefore
): TAfter => {
  const camelCaseObject: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const camelCaseKey = camelCase(key);

      if (isPlainObject(value)) {
        camelCaseObject[camelCaseKey] = snakeToCamel(
          value as Record<string, unknown>
        );
      } else if (Array.isArray(value)) {
        camelCaseObject[camelCaseKey] = value.map((item) => {
          if (isPlainObject(item)) {
            return snakeToCamel(item as Record<string, unknown>);
          }
          return item;
        });
      } else {
        camelCaseObject[camelCaseKey] = value;
      }
    }
  }

  return camelCaseObject as TAfter;
};

export const preProcessSnakeToCamel = <T extends z.AnyZodObject>(schema: T) => {
  return z.preprocess((data) => {
    const recordData = z.record(z.unknown()).parse(data);
    return snakeToCamel(recordData);
  }, schema);
};

export const getUserRoles = (
  keycloakUserInfo: Record<string, unknown>
): string[] | null => {
  const resourceAccess = keycloakUserInfo?.["resource_access"] as Record<
    string,
    Record<string, unknown>
  > | null;

  if (!resourceAccess) {
    return null;
  }

  const webClientResourceAccess = resourceAccess["web-client"] as Record<
    string,
    unknown
  > | null;

  if (!webClientResourceAccess) {
    console;
    return null;
  }

  const roles = webClientResourceAccess["roles"] as string[] | undefined;

  if (!roles) {
    return null;
  }

  return roles;
};
