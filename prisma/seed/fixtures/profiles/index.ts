import { Prisma, User } from "@prisma/client";
import { Profile } from "next-auth";

function generateSeedProfiles(users: User[]): Prisma.ProfileCreateManyInput[] {
  return users.map((user) => {
    return {
      userId: user.id,
      website: "https://example.com",
      github: "shouta0715",
      twitter: "shoutapu0715",
    };
  });
}

export async function seedProfile(
  tx: Prisma.TransactionClient,
  users: User[]
): Promise<Profile[]> {
  const result = await tx.profile.findMany();

  if (result.length > 1) {
    // eslint-disable-next-line no-console
    console.log("Profiles already seeded");

    return result;
  }

  const values = generateSeedProfiles(users);

  await tx.profile.createMany({
    data: values,
  });

  return tx.profile.findMany();
}
