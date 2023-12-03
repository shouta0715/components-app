import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}



export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations/drizzle",
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL
  }
} satisfies Config;


