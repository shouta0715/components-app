import { Prisma } from "@prisma/client";

export type GetTrendComponentParams = {
  limit: number;
  offset: number;
  categoryName?: string;
};
export const getTrendComponentSQL = ({
  limit,
  offset,
  categoryName,
}: GetTrendComponentParams) => {
  const where = categoryName
    ? Prisma.sql`WHERE comp."categoryName" = ${categoryName}`
    : Prisma.sql``;

  return Prisma.sql`
    WITH likes_weight_data AS (
      SELECT
        "componentId" AS component_id,
        SUM(
          CASE WHEN "createdAt" > NOW() - INTERVAL '12 hours' THEN 0.5
          WHEN "createdAt" > NOW() - INTERVAL '24 hours' THEN 0.3
          WHEN "createdAt" > NOW() - INTERVAL '72 hours' THEN 0.1
          ELSE 0
        END) AS weight,
        COUNT(*) AS likes_count
      FROM
        likes
      GROUP BY
        "componentId"
    ),
    sorted_components AS (
      SELECT
        comp.id,
        comp."name",
        comp."previewUrl",
        COALESCE(lwd.weight, 0) AS weight,
        comp."createdAt",
        comp."creatorId",
        likes_count AS count
      FROM
        components AS comp
        LEFT JOIN likes_weight_data AS lwd ON comp.id = lwd.component_id
      ${where}
      ORDER BY
        COALESCE(lwd.weight, 0) DESC,
        comp."createdAt" DESC
      LIMIT ${limit} OFFSET ${offset}
    )
    SELECT
      scomp.id,
      scomp."name" AS name,
      scomp."previewUrl",
      scomp.weight,
      scomp."createdAt",
      scomp.count,
      f."extension",
      u.id AS user_id,
      u."name" AS user_name,
      u.image AS user_image
    FROM
      sorted_components AS scomp
      JOIN files AS f ON scomp.id = f."componentId"
      JOIN users AS u ON scomp."creatorId" = u.id
    ORDER BY
      scomp.weight DESC,
      scomp."createdAt" DESC;
  `;
};
