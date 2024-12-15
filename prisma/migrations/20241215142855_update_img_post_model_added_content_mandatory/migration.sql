/*
  Warnings:

  - Made the column `content` on table `ImgPost` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImgPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ImgPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImgPost" ("content", "createdAt", "id", "imgUrl", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "imgUrl", "title", "updatedAt", "userId" FROM "ImgPost";
DROP TABLE "ImgPost";
ALTER TABLE "new_ImgPost" RENAME TO "ImgPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
