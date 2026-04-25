import createClient from "openapi-fetch";
import { config } from "dotenv";
import type { paths } from "./schema";

config();

export const client = createClient<paths>({ baseUrl: process.env.API_URL!, });