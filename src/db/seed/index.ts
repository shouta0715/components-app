/* eslint-disable no-console */
import { seedCategories } from "@/db/fixtures/categories";
import { seedCodes } from "@/db/fixtures/code";
import { seedComponents, seedComponentsSets } from "@/db/fixtures/components";
import { seedComponentSetItems } from "@/db/fixtures/componentSetItem";
import { seedDependencies } from "@/db/fixtures/dependencies";
import { seedPurchases } from "@/db/fixtures/purchases";
import { seedReviews } from "@/db/fixtures/reviews";
import { seedUser } from "@/db/fixtures/user";
import { seedDrizzle } from "@/db/seed/client";

async function main() {
  await seedDrizzle.transaction(async (tx) => {
    const users = await seedUser(tx);
    const categories = await seedCategories(tx);
    const components = await seedComponents(tx, categories, users);
    const componentsSets = await seedComponentsSets(tx, users);
    await seedComponentSetItems(tx, components, componentsSets);
    const codes = await seedCodes(tx, components);
    await seedDependencies(tx, codes);
    await seedReviews(tx, components, users);
    await seedPurchases(tx, components, componentsSets, users);
  });

  console.log("Seeding complete");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
