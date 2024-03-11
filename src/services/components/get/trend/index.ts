import {
  InputTrendComponent,
  toResTrendComponents,
} from "@/domain/components/trend";
import { prisma, runPrisma } from "@/lib/client/prisma";
import {
  GetTrendComponentParams,
  getTrendComponentSQL,
} from "@/services/components/get/trend/sql";

export const getTrendComponents = async (arg: GetTrendComponentParams) => {
  const sql = getTrendComponentSQL(arg);

  const components = await runPrisma<InputTrendComponent[]>(() =>
    prisma.$queryRaw(sql)
  );

  return toResTrendComponents(components);
};
