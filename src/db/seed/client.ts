/* eslint-disable no-console */
import { loadEnvConfig } from "@next/env";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { MySqlTransaction } from "drizzle-orm/mysql-core";
import {
  MySql2PreparedQueryHKT,
  MySql2QueryResultHKT,
  drizzle as DevDrizzle,
} from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
import * as schema from "@/db/schema";

loadEnvConfig(process.cwd());

const devConnection = createConnection({
  uri: process.env.DATABASE_URL,
});

export const seedDrizzle = DevDrizzle<typeof schema>(devConnection, {
  mode: "planetscale",
  schema,
});

export type Tx = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
