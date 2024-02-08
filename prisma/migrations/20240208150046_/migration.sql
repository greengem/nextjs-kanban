/*
  Warnings:

  - You are about to drop the `FavoriteBoard` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `BoardMember` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'owner');

-- DropForeignKey
ALTER TABLE "FavoriteBoard" DROP CONSTRAINT "FavoriteBoard_boardId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteBoard" DROP CONSTRAINT "FavoriteBoard_userId_fkey";

-- AlterTable
-- ALTER TABLE "BoardMember" DROP COLUMN "role",
-- ADD COLUMN     "role" "Role" NOT NULL;
ALTER TABLE "BoardMember" ADD COLUMN "newRole" "Role";
UPDATE "BoardMember" SET "newRole" = "role"::text::"Role";
ALTER TABLE "BoardMember" DROP COLUMN "role";
ALTER TABLE "BoardMember" RENAME COLUMN "newRole" TO "role";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedToId" TEXT;

-- DropTable
DROP TABLE "FavoriteBoard";

-- CreateTable
CREATE TABLE "_favorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favorites_AB_unique" ON "_favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_favorites_B_index" ON "_favorites"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;