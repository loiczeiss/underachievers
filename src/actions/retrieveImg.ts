import { db } from "@/db";
import { Image } from "@prisma/client";
export async function retrieveImg(publicId: string){

    let img : Image | null
   return img=await db.image.findUnique({where:{publicId: publicId}})
}