'use server';
import { db } from '@/db';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Correct key
});

export async function deleteAudio(publicId: string) {
  try {
    const audioRecord = await db.audio.findUnique({
      where: { publicId },
    });

    if (!audioRecord) {
      console.error(`Audio record with publicId "${publicId}" not found.`);
      return; // Early exit to prevent further errors
    }
    await cloudinary.uploader
      .destroy(publicId, { resource_type: 'video' })
      .then((result) => console.log(result));
    await db.audio.delete({
      where: { publicId },
    });
    console.log(`Deleted audio record with publicId "${publicId}".`);
  } catch (error) {
    console.error(error);
  }
}
