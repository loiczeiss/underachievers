
"use server"

import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Correct key
});

export async function deleteImg(publicId: string) {

    try {
      const image = await db.image.findUnique({where:{publicId}})
      if (!image) {
        console.error(`Image with publicId "${publicId}" not found.`);
        return; // Early exit to prevent further errors
      }
        await cloudinary.uploader.destroy(publicId).then((result)=> console.log(result))

        await db.image.delete({
          where: { publicId: publicId },
        }); 
   
    } catch (error) {
        console.error("Error during image deletion:", error);
    }
}
