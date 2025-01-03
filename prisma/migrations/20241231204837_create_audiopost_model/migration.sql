-- AlterEnum
ALTER TYPE "PostType" ADD VALUE 'AUDIO';

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "audioPostId" TEXT;

-- CreateTable
CREATE TABLE "AudioPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "audioId" TEXT NOT NULL,

    CONSTRAINT "AudioPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AudioPost" ADD CONSTRAINT "AudioPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioPost" ADD CONSTRAINT "AudioPost_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_audioPostId_fkey" FOREIGN KEY ("audioPostId") REFERENCES "AudioPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
