"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Audio } from "@prisma/client";

interface ResultProps {
  info: {
    display_name: string;
    public_id: string;
    duration: number;
    format: string;
    secure_url: string;
    thumbnail_url: string;
    playback_url: string;
  };
}

export async function uploadAudio(result: ResultProps) {
  const session = await auth();

  try {
    await db.audio.create({
      data: {
        publicId: result.info.public_id,
        url: result.info.secure_url,
        displayName: result.info.display_name,
        playbackUrl: result.info.playback_url,
        thumbnailUrl: result.info.thumbnail_url,
        duration: result.info.duration,
        format: result.info.format,
        userId: session?.user?.id as string,
      },
    });
    return {
      url: result.info.secure_url,
      publicId: result.info.public_id,
      duration: result.info.duration,
      format: result.info.format,
      displayName: result.info.display_name,
      playbackUrl: result.info.playback_url,
      thumbnailUrl: result.info.thumbnail_url,
      userId: session?.user?.id as string,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Database error:", err);
      return {
        errors: {
          _form: [err.message],
        },
      };
    }

    console.error("Unexpected error:", err);
    return {
      errors: {
        _form: ["Failed to create post"],
      },
    };
  }
}
