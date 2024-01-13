-- DropForeignKey
ALTER TABLE "FavoriteBoard" DROP CONSTRAINT "FavoriteBoard_boardId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteBoard" ADD CONSTRAINT "FavoriteBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
