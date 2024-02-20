import { prisma } from "@/lib/client/prisma";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

export async function updateComponent(id: string, input: ComponentUpdateInput) {
  return prisma.component.update({
    where: { id },
    data: input,
    select: { id: true },
  });
}
