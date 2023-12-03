/*
  Warnings:

  - You are about to drop the column `provider_account_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionToken` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Account_provider_provider_account_id_key` ON `Account`;

-- DropIndex
DROP INDEX `Account_user_id_idx` ON `Account`;

-- DropIndex
DROP INDEX `Session_session_token_key` ON `Session`;

-- DropIndex
DROP INDEX `Session_user_id_idx` ON `Session`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `provider_account_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `providerAccountId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `session_token`,
    DROP COLUMN `user_id`,
    ADD COLUMN `sessionToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email_verified`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account`(`provider`, `providerAccountId`);

-- CreateIndex
CREATE UNIQUE INDEX `Session_sessionToken_key` ON `Session`(`sessionToken`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
