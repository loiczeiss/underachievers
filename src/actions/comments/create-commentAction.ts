"use server";

import { z } from "zod";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { PostType } from "@prisma/client";

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
      errors: {
        _form: ["You must be signed in to do this."],
      },
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
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create comment due to an unknown error."],
        },
      };
    }
  }

  if (postType === "TEXT") redirect(paths.textPostShow(postId));
  if (postType === "IMAGE") redirect(paths.imgPostShow(postId));
  if (postType === "AUDIO") redirect(paths.audioPostShowPage(postId));
}
