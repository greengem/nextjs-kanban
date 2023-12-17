/*
  Warnings:

  - You are about to drop the column `name` on the `Label` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Label" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;
