/*
  Warnings:

  - Added the required column `postType` to the `AudioPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postType` to the `ImgPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postType` to the `TextPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postType` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AudioPost" ADD COLUMN     "postType" "PostType" NOT NULL;

-- AlterTable
ALTER TABLE "ImgPost" ADD COLUMN     "postType" "PostType" NOT NULL;

-- AlterTable
ALTER TABLE "TextPost" ADD COLUMN     "postType" "PostType" NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "postType" "PostType" NOT NULL;
