/* eslint-disable no-console */
import { reviews } from "@/db/schema";
import { Tx } from "@/db/seed/client";
import { Component, InsertReview, User } from "@/types/drizzle";
import { randomNum } from "@/utils/random";

function generateSeedReviews(
  components: Component[],
  users: User[]
): InsertReview[] {
  const created = components.map((component) => {
    return Array.from({ length: 10 }).map(() => {
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

export async function seedReviews(
  tx: Tx,
  components: Component[],
  users: User[]
): Promise<void> {
  const result = await tx.query.reviews.findFirst();

  if (result) {
    console.log("Reviews already seeded");

    return;
  }

  const values = generateSeedReviews(components, users);

  await tx.insert(reviews).values(values);
}
