'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { Vote } from '@prisma/client';

type PostType = 'IMAGE' | 'AUDIO' | 'TEXT';

type PostFieldMap = {
  IMAGE: 'imgPostId';
  AUDIO: 'audioPostId';
  TEXT: 'textPostId';
};

const postFieldMap: PostFieldMap = {
  IMAGE: 'imgPostId',
  AUDIO: 'audioPostId',
  TEXT: 'textPostId',
};

export async function handlePostVote(postId: string, postType: PostType) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  const field = postFieldMap[postType];

  const existingVote = await db.vote.findFirst({
    where: {
      userId: session.user.id as string,
      [field]: postId,
    },
  });

  try {
    if (existingVote) {
      await db.vote.delete({ where: { id: existingVote.id } });
      return { success: false };
    } else {
      const vote: Vote = await db.vote.create({
        data: {
          userId: session.user.id as string,
          voteType: 'UP',
          [field]: postId,
          postType,
        },
      });
      return { success: true, vote };
    }
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
          _form: ['Failed to create vote due to an unknown error.'],
        },
      };
    }
  }
}
