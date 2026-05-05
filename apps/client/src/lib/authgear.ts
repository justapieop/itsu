import { AuthgearConfig } from "@authgear/nextjs";
import { loadEnvConfig } from "@next/env";
import { join } from "path";

const cwd: string = process.cwd();

loadEnvConfig(join(cwd, "..", ".."));

export const authgearConfig: AuthgearConfig = {
  endpoint: process.env.AUTHGEAR_ENDPOINT!,
  clientID: process.env.AUTHGEAR_CLIENT_ID!,
  redirectURI: process.env.AUTHGEAR_REDIRECT_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
};