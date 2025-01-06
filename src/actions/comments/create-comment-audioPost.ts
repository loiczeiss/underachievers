'use server'


import type { Comment } from "@prisma/client";
import {z} from "zod"
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import paths from "@/paths";

const createCommentSchema = z.object({
    content: z.string().min(3, "Comment must be at least 3 characters long."),
    audioPostId: z.string().min(1, "Post ID is required."), // Added postId validation
  });

  interface CreateCommentPostFormState {
    errors: {
      content?: string[];
      audioPostId?: string[];
      _form?: string[];
    };
  }
  export async function createCommentAudioAction(
    formState: CreateCommentPostFormState,
    formData: FormData
  ): Promise<CreateCommentPostFormState> {
    const result = createCommentSchema.safeParse({
      content: formData.get("content"),
      audioPostId: formData.get("audioPostId"), // Ensure postId is passed from the form
    });
  
    // Handle schema validation errors
    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }
  
    const { content, audioPostId } = result.data;
  console.log(result.data)
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be signed in to do this."],
        },
      };
    }
    let comment: Comment
    try {
      // Create the comment and associate it with the post and user
   comment = await db.comment.create({
        data: {
          content,
          userId: session.user.id, // Ensure the comment is associated with the current user
          userName: session.user.name as string,
          userImage: session.user.image as string,
          audioPostId, // Ensure the comment is associated with the correct post
          postType: "AUDIO", // Or determine the postType based on the context (e.g., 'TEXT' or 'IMG')
          // Optional: You can add other fields like parent, children if applicable
        },
      });
  
      // Redirect to the post page after successfully creating the comment
  
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
    redirect(paths.audioPostShowPage(audioPostId));
  }
  