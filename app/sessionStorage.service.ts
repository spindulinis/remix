import { createCookieSessionStorage } from "@remix-run/node";
import * as process from "node:process";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cr3t"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});

