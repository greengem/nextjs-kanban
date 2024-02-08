/*
  Warnings:

  - Made the column `role` on table `BoardMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BoardMember" ALTER COLUMN "role" SET NOT NULL;
