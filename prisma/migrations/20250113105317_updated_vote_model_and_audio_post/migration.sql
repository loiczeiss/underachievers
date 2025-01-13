-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "audioPostId" TEXT;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_audioPostId_fkey" FOREIGN KEY ("audioPostId") REFERENCES "AudioPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
