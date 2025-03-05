/*
  Warnings:

  - Made the column `postType` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "postType" SET NOT NULL;
