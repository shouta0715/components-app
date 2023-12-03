/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { loadEnvConfig } from "@next/env";
import { connect } from "@planetscale/database";
import { drizzle as DevDrizzle } from "drizzle-orm/mysql2";
import { migrate as DevMigrate } from "drizzle-orm/mysql2/migrator";
import { drizzle as Drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate as Migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { createPool } from "mysql2";
import config from "@/../drizzle.config";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

const isProduction = process.env.NODE_ENV === "production";

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const devConnection = createPool({
  uri: process.env.DATABASE_URL,
});

const migrationsFolder = `${process.cwd()}/${config.out}`;
(async () => {
  try {
    if (isProduction) {
      await Migrate(Drizzle(connection), { migrationsFolder });
    } else {
      await DevMigrate(DevDrizzle(devConnection), { migrationsFolder });
      devConnection.end();
    }
    console.log("Database migration complete");

    process.exit(0);
  } catch (error: any) {
    devConnection.end();
    if (error.sqlState === "42S01") {
      console.log("Database migration complete");

      process.exit(0);
    }

    console.error(error);
    process.exit(1);
  }
})();
