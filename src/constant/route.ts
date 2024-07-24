export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SALES: "/sales",
  HUMAN_RESOURCE: "/human-resource",
  PROFILE: "/profile",
} as const satisfies Record<string, string>;

export const API_ROUTES = {
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
} as const satisfies Record<string, string>;
