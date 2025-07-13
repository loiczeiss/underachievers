'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { deleteAudio } from './delete-audio';

export async function deleteAudioPost(id: string, userId: string, publicId: string) {
  await db.audioPost.delete({ where: { id } });
  await deleteAudio(publicId);

  revalidatePath(`${paths.userPostsPage(userId)}`);
  redirect(`${paths.userPostsPage(userId)}`);
}
