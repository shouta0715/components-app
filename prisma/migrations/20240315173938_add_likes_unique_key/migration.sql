/*
  Warnings:

  - A unique constraint covering the columns `[componentId,userId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likes_componentId_userId_key" ON "likes"("componentId", "userId");
