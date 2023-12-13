-- CreateTable
CREATE TABLE "FavoriteBoard" (
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "FavoriteBoard_pkey" PRIMARY KEY ("userId","boardId")
);

-- AddForeignKey
ALTER TABLE "FavoriteBoard" ADD CONSTRAINT "FavoriteBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBoard" ADD CONSTRAINT "FavoriteBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
