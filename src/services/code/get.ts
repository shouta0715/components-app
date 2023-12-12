import { eq } from "drizzle-orm";
import { cache } from "react";
import { codes } from "@/db/schema";
import { drizzle } from "@/lib/client/drizzle";
import { Code } from "@/types/drizzle";

export const getCode = cache(
  async (id: string): Promise<Code[] | undefined> => {
    return drizzle.select().from(codes).where(eq(codes.id, id));
  }
);

export const getCodeByComponentId = cache(
  async (componentId: string): Promise<Code[] | undefined> => {
    const res = await drizzle
      .select()
      .from(codes)
      .where(eq(codes.componentId, componentId));

    return res;
  }
);
