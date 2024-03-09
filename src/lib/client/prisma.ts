import { Prisma, PrismaClient } from "@prisma/client";

import { BadRequestError, InternalServerError } from "@/lib/errors";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function handlePrismaError(err: unknown): never {
  if (err instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestError();
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    throw new InternalServerError();
  }
  throw err;
}

// eslint-disable-next-line consistent-return
export const runPrisma = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    handlePrismaError(err);
  }
};
