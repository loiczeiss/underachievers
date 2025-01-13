-- RenameForeignKey
ALTER TABLE "Like" RENAME CONSTRAINT "Like_Comment_commentId_fkey" TO "Like_commentId_fkey";
