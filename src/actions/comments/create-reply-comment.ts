"use server";

import { z } from "zod";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import paths from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1, "Comment must be something... god..."),
  parentId: z.string().min(1, "parentID required."),
  postId: z.string().min(1, "Post ID is required."),
  postType: z.enum(["TEXT", "IMAGE", "AUDIO"]),
});

interface CreateCommentPostFormState {
  errors: {
    content?: string[];
    postId?: string[];
    postType?: string[];
    parentId?: string[];
    _form?: string[];
  };
}

export async function createReplyCommentAction(
  formState: CreateCommentPostFormState,
  formData: FormData
): Promise<CreateCommentPostFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
    parentId: formData.get("parentId"),
    postId: formData.get("postId"),
    postType: formData.get("postType"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { content, parentId,postId, postType } = result.data;

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in. And you shouldn't be seeing this page then.... damn code..."],
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
        parentId,
        postType,
        textPostId: postType === "TEXT" ? postId : null,
        imgPostId: postType === "IMAGE" ? postId : null,
        audioPostId: postType === "AUDIO" ? postId : null,
      },
    });

    // Reload the page by redirecting to the same URL

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
          _form: ["Failed to create comment due to an unknown error"],
        },
      };
    }
  }
  if (postType === "TEXT") {
    redirect(paths.textPostShow(postId));
  } else if (postType === "IMAGE") {
    redirect(paths.imgPostShow(postId));
  } else if (postType === "AUDIO") { 
    redirect(paths.audioPostShowPage(postId));
  } else {
    console.error("Unknown post type:", postType);
  }
}  
