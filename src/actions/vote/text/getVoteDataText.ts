"use server";

import { db } from "@/db";

export async function getVoteDataText(postId: string, userId: string) {
  let voteCount: number;
  try {
    voteCount = await db.vote.count({ where: { textPostId: postId } });
    const existingLike = await db.vote.findFirst({
      where: { userId, textPostId: postId },
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
