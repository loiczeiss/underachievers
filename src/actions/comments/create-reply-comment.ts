"use server";

import { z } from "zod";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const createCommentSchema = z.object({
  content: z.string().min(1, "Comment must be something... god..."),
  parentId: z.string().min(1, "parentID required."),
});

interface CreateCommentPostFormState {
  errors: {
    content?: string[];
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
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { content, parentId } = result.data;

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
      },
    });

    // Reload the page by redirecting to the same URL
    redirect("/");
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
}
