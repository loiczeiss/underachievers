"use server";

import { z } from "zod";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import paths from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(3, "Comment must be at least 3 characters long."),
  postId: z.string().min(1, "Post ID is required."),
  postType: z.enum(["TEXT", "IMAGE", "AUDIO"]),
});

interface CreateCommentPostFormState {
  errors: {
    content?: string[];
    postId?: string[];
    postType?: string[];
    _form?: string[];
  };
}

export async function createCommentAction(
  formState: CreateCommentPostFormState,
  formData: FormData
): Promise<CreateCommentPostFormState> {
  // Validate input
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
    postType: formData.get("postType"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { content, postId, postType } = result.data;
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: { _form: ["You must be signed in to do this."] },
    };
  }

  try {
    await db.comment.create({
      data: {
        content,
        userId: session.user.id as string,
        userName: session.user.name as string,
        userImage: session.user.image as string,
        postType,
        textPostId: postType === "TEXT" ? postId : null,
        imgPostId: postType === "IMAGE" ? postId : null,
        audioPostId: postType === "AUDIO" ? postId : null,
      },
    });
  } catch (err: unknown) {
    return {
      errors: {
        _form: [err instanceof Error ? err.message : "Failed to create comment due to an unknown error."],
      },
    };
  }

  // Redirect and return `never` type to satisfy TypeScript
  if (postType === "TEXT") {
    redirect(paths.textPostShow(postId));
  } else if (postType === "IMAGE") {
    redirect(paths.imgPostShow(postId));
  } else if (postType === "AUDIO") {
    redirect(paths.audioPostShowPage(postId));
  }

  return { errors: {} }; // Should never reach here, but required by TypeScript
}
