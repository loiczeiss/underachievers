'use server';

import { z } from 'zod';
import { db } from '@/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { PostType } from '@prisma/client';

// Extend the schema to include imageUrl validation
const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  imgUrl: z.string().url('Image URL must be a valid URL.'),
  imgPublicId: z.string().refine((val) => typeof val === 'string' && val.trim().length > 0, {
    message: 'imgPublicId must be a non-empty string.',
  }),
  postType: z.string().min(1),
});

interface CreateImgPostFormState {
  errors: {
    title?: string[];
    content?: string[];
    imgUrl?: string[];
    imgPublicId?: string[];
    postType?: string[];
    _form?: string[];
  };
}

export async function createImgPostAction(
  formState: CreateImgPostFormState,
  formData: FormData
): Promise<CreateImgPostFormState> {
  // Parse form data
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    imgUrl: formData.get('imgUrl'),
    imgPublicId: formData.get('imgPublicId'),
    postType: formData.get('postType'),
  });

  // Handle schema validation errors
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { title, content, imgUrl, imgPublicId } = result.data;

  // Check authentication
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  try {
    // Create post in the database
    await db.imgPost.create({
      data: {
        title,
        content,
        userId: session.user.id as string,
        imgUrl,
        imgPublicId,
        postType: result.data.postType as PostType,
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
          _form: ['Failed to create post due to an unknown error.'],
        },
      };
    }
  }

  // Redirect to the post creation page or another destination
  revalidatePath(paths.imgPostsListPage());
  redirect(paths.imgPostsListPage());
}
