/*
  Warnings:

  - You are about to drop the column `image` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `userImage` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "userImage" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
