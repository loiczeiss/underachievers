'use server';

import { db } from '@/db';
export async function retrieveImg(publicId: string) {
  return await db.image.findUnique({ where: { publicId: publicId } });
}
