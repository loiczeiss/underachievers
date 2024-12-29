/*
  Warnings:

  - You are about to drop the column `parentId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ImgPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_TextPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "parentId",
DROP COLUMN "postId",
ADD COLUMN     "imgPostId" TEXT,
ADD COLUMN     "textPostId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_TextPost_textPostId_fkey" FOREIGN KEY ("textPostId") REFERENCES "TextPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ImgPost_imgPostId_fkey" FOREIGN KEY ("imgPostId") REFERENCES "ImgPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
