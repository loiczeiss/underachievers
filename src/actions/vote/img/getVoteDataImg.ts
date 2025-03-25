"use server";

import { db } from "@/db";

export async function getVoteDataImg(postId: string, userId: string) {
  let voteCount: number;
  try {
    voteCount = await db.vote.count({ where: { imgPostId: postId } });
    const existingLike = await db.vote.findFirst({
      where: { userId, imgPostId: postId },
      cacheStrategy: { swr: 60 },
    });
    return { voteCount, existingLike };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to count vote due to an unknown error."],
        },
      };
    }
  }
}
