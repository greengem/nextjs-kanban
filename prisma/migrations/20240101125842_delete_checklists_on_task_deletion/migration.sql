-- DropForeignKey
ALTER TABLE "Checklist" DROP CONSTRAINT "Checklist_taskId_fkey";

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
