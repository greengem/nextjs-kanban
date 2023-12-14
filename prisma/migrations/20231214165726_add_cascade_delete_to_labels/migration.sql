-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_boardId_fkey";

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
