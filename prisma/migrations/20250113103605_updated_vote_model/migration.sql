-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "textPostId" TEXT;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_textPostId_fkey" FOREIGN KEY ("textPostId") REFERENCES "TextPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
