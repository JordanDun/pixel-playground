import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const req = getRequest();
  const host = req.headers.get("host")!;
  const proto = req.headers.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
});
