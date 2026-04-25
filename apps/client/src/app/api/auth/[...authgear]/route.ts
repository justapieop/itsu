import { createAuthgearHandlers } from "@authgear/nextjs";
import { authgearConfig } from "@/lib/authgear";

console.log(authgearConfig);

export const { GET, POST } = createAuthgearHandlers(authgearConfig);