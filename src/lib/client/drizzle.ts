import { connect } from "@planetscale/database";
import { drizzle as DevDrizzle } from "drizzle-orm/mysql2";
import {
  drizzle as Drizzle,
  PlanetScaleDatabase,
} from "drizzle-orm/planetscale-serverless";
import { createConnection } from "mysql2";
import * as schema from "@/db/schema";

if (
  !process.env.DATABASE_URL ||
  !process.env.DATABASE_HOST ||
  !process.env.DATABASE_USERNAME ||
  !process.env.DATABASE_PASSWORD
) {
  throw new Error("DATABASE_URL not set");
}

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const devConnection = createConnection({
  uri: process.env.DATABASE_URL,
});

export const drizzle =
  process.env.NODE_ENV === "production"
    ? Drizzle(connection, { schema })
    : (DevDrizzle<typeof schema>(devConnection, {
        mode: "planetscale",
        schema,
      }) as unknown as PlanetScaleDatabase<typeof schema>);
