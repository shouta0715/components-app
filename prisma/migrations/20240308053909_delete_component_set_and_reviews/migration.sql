/*
  Warnings:

  - You are about to drop the `_ComponentToComponentSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `componentReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `componentSetLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `componentSetReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `componentSets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ComponentToComponentSet" DROP CONSTRAINT "_ComponentToComponentSet_A_fkey";

-- DropForeignKey
ALTER TABLE "_ComponentToComponentSet" DROP CONSTRAINT "_ComponentToComponentSet_B_fkey";

-- DropForeignKey
ALTER TABLE "componentReviews" DROP CONSTRAINT "componentReviews_componentId_fkey";

-- DropForeignKey
ALTER TABLE "componentReviews" DROP CONSTRAINT "componentReviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "componentSetLikes" DROP CONSTRAINT "componentSetLikes_componentSetId_fkey";

-- DropForeignKey
ALTER TABLE "componentSetLikes" DROP CONSTRAINT "componentSetLikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "componentSetReviews" DROP CONSTRAINT "componentSetReviews_componentSetId_fkey";

-- DropForeignKey
ALTER TABLE "componentSetReviews" DROP CONSTRAINT "componentSetReviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "componentSets" DROP CONSTRAINT "componentSets_creatorId_fkey";

-- DropTable
DROP TABLE "_ComponentToComponentSet";

-- DropTable
DROP TABLE "componentReviews";

-- DropTable
DROP TABLE "componentSetLikes";

-- DropTable
DROP TABLE "componentSetReviews";

-- DropTable
DROP TABLE "componentSets";

-- DropEnum
DROP TYPE "Responsive";
