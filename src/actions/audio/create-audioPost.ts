'use server';

import type { Audio, PostType } from '@prisma/client';
import { z } from 'zod';
import { db } from '@/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

// Extend the schema to include audioUrl validation
const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  audioUrl: z.string().url('Audio URL must be a valid URL.'),
  postType: z.string().min(1),
});

interface CreateAudioPostFormState {
  errors: {
    title?: string[];
    content?: string[];
    audioUrl?: string[];
    _form?: string[];
    postType?: string[];
  };
}

export async function createAudioPostAction(
  formState: CreateAudioPostFormState,
  formData: FormData
): Promise<CreateAudioPostFormState> {
  // Parse form data
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    audioUrl: formData.get('audioUrl'),
    postType: formData.get('postType'),
  });

  // Handle schema validation errors
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { title, content, audioUrl } = result.data;

  // Check authentication
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  let audio: Audio;
  try {
    // Retrieve the audio record based on the audioUrl
    audio = (await db.audio.findUnique({
      where: {
        url: audioUrl, // Assuming audioUrl is unique
      },
    })) as Audio;

    if (!audio) {
      return {
        errors: {
          _form: ['Audio not found.'],
        },
      };
    }

    // Create the audio post and associate it with the existing audio
    await db.audioPost.create({
      data: {
        title,
        content,
        userId: session.user.id as string,
        audioId: audio.id,
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

  // Redirect to the audio posts list page
  revalidatePath(paths.audioPostListPage()); // Corrected path for audio posts
  redirect(paths.audioPostListPage()); // Redirect to the audio posts page
}
