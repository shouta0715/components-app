/*
  Warnings:

  - A unique constraint covering the columns `[followerId,followingId]` on the table `follows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `follows_followerId_followingId_key` ON `follows`(`followerId`, `followingId`);
