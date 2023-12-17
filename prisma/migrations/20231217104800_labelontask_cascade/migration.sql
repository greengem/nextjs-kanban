-- DropForeignKey
ALTER TABLE "LabelOnTask" DROP CONSTRAINT "LabelOnTask_taskId_fkey";

-- AddForeignKey
ALTER TABLE "LabelOnTask" ADD CONSTRAINT "LabelOnTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
