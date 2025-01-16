/*
  Warnings:

  - Added the required column `imgPublicId` to the `ImgPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImgPost" ADD COLUMN     "imgPublicId" TEXT NOT NULL;
