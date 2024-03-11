import { Extension } from "@prisma/client";

export type TrendComponent = {
  id: string;
  name: string;
  previewUrl: string;
  weight: number;
  createdAt: Date;
  count: number;
  creator: {
    id: string;
    name: string | null;
    image: string | null;
  };
  extensions: { extension: Extension }[];
};

export type InputTrendComponent = {
  id: string;
  name: string;
  previewUrl: string;
  weight: 10;
  createdAt: Date;
  count: bigint;
  extension: Extension;
  user_id: string;
  user_name: string | null;
  user_image: string | null;
};

export const toResTrendComponents = (
  input: InputTrendComponent[]
): TrendComponent[] => {
  const grouped = input.reduce(
    (acc, cur) => {
      if (acc[cur.id]) {
        acc[cur.id].extensions.push({ extension: cur.extension });

        return acc;
      }

      acc[cur.id] = {
        id: cur.id,
        name: cur.name,
        previewUrl: cur.previewUrl,
        weight: cur.weight,
        createdAt: cur.createdAt,
        count: Number(cur.count),
        creator: {
          id: cur.user_id,
          name: cur.user_name,
          image: cur.user_image,
        },
        extensions: [],
      };

      acc[cur.id].extensions.push({ extension: cur.extension });

      return acc;
    },
    {} as Record<string, TrendComponent>
  );

  const values = Object.values(grouped);

  return values;
};
