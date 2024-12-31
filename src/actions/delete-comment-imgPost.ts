"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import paths from "@/paths"


export async function deleteCommentImgPost(id:string, imgPostId: string){
    await db.comment.delete({where:{id}})
    revalidatePath(`${paths.imgPostShow(imgPostId)}`)

}