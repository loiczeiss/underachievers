'use server'

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";

export async function deleteImgPost(id:string, userId:string, publicId: string){
    await db.imgPost.delete({where: {id}})
    await db.image.delete({where:{publicId}})
    revalidatePath(`${paths.userPostsPage(userId)}`)
    redirect(`${paths.userPostsPage(userId)}`)
}