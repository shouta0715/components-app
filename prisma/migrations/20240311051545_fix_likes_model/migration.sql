/*
  Warnings:

  - You are about to drop the `componentLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "componentLikes" DROP CONSTRAINT "componentLikes_componentId_fkey";

-- DropForeignKey
ALTER TABLE "componentLikes" DROP CONSTRAINT "componentLikes_userId_fkey";

-- DropTable
DROP TABLE "componentLikes";

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "componentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "likes_componentId_idx" ON "likes"("componentId");

-- CreateIndex
CREATE INDEX "likes_userId_idx" ON "likes"("userId");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
