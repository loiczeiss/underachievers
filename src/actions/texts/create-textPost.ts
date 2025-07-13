'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { PostType } from '@prisma/client';

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  postType: z.string().min(1),
});

interface CreateTextPostFormState {
  errors: {
    title?: string[];
    content?: string[];
    postType?: string[];
    _form?: string[];
  };
}
export async function createTextPostAction(
  formState: CreateTextPostFormState,
  formData: FormData
): Promise<CreateTextPostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    postType: formData.get('postType'),
  });
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  try {
    await db.textPost.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        postType: result.data.postType as PostType,
        userId: session.user.id as string,
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
          _form: ['Failed to create post'],
        },
      };
    }
  }

  revalidatePath(paths.textPostsListPage());
  redirect(paths.textPostsListPage());
}
