'use server'

import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export async function deleteImg(publicId:string){
    await db.image.delete({where: {publicId}})
    await cloudinary.uploader.destroy(publicId).then(result=>console.log(result))

}