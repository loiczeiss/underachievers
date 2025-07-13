'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

export async function deleteComment(
  id: string,
  postId: string,
  postType: 'AUDIO' | 'IMAGE' | 'TEXT'
) {
  await db.comment.delete({ where: { id } });

  const pathMap = {
    AUDIO: paths.audioPostShowPage,
    IMAGE: paths.imgPostShow,
    TEXT: paths.textPostShow,
  };

  revalidatePath(pathMap[postType](postId));
}
