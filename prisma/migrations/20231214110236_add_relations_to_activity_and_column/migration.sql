-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_oldColumnId_fkey" FOREIGN KEY ("oldColumnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_newColumnId_fkey" FOREIGN KEY ("newColumnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_originalColumnId_fkey" FOREIGN KEY ("originalColumnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;
