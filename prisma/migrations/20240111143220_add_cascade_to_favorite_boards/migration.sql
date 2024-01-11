-- DropForeignKey
ALTER TABLE "FavoriteBoard" DROP CONSTRAINT "FavoriteBoard_userId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteBoard" ADD CONSTRAINT "FavoriteBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
