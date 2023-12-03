import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query", "info", "warn", "error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type Transaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
