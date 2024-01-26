/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `components` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `components` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `components_categoryId_idx` ON `components`;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `components` DROP COLUMN `categoryId`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `components_categoryName_idx` ON `components`(`categoryName`);
