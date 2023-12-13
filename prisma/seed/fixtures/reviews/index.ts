/* eslint-disable no-console */

import { Component, ComponentSet, Prisma, User } from "@prisma/client";
import { randomNum } from "@/utils/random";

function generateSeedComponentReviews(
  components: Component[],
  users: User[]
): Prisma.ComponentReviewCreateManyInput[] {
  const created = components.map((component) => {
    return Array.from({ length: 5 }).map(() => {
      return {
        componentId: component.id,
        userId: users[randomNum(0, users.length - 1)].id,
        rating: randomNum(1, 5),
        comment: "This is a review",
      };
    });
  });

  return created.flat();
}

function generateSeedComponentSetReviews(
  components: ComponentSet[],
  users: User[]
): Prisma.ComponentSetReviewCreateManyInput[] {
  const created = components.map((component) => {
    return Array.from({ length: 5 }).map(() => {
      return {
        componentSetId: component.id,
        userId: users[randomNum(0, users.length - 1)].id,
        rating: randomNum(1, 5),
        comment: "This is a review",
      };
    });
  });

  return created.flat();
}

export async function seedReviews(
  tx: Prisma.TransactionClient,
  components: Component[],
  componentsSets: ComponentSet[],
  users: User[]
): Promise<void> {
  const result = await tx.componentReview.findFirst();
  const result2 = await tx.componentSetReview.findFirst();

  if (!result) {
    console.log("Seeding reviews");
    const values = generateSeedComponentReviews(components, users);

    await tx.componentReview.createMany({ data: values });
  }

  if (!result2) {
    console.log("Seeding component set reviews");
    const values2 = generateSeedComponentSetReviews(componentsSets, users);

    await tx.componentSetReview.createMany({ data: values2 });
  }

  console.log("Reviews already seeded");
}
