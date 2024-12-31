-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "playbackUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audio_publicId_key" ON "Audio"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_url_key" ON "Audio"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_playbackUrl_key" ON "Audio"("playbackUrl");
