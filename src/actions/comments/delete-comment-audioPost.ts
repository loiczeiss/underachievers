"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import paths from "@/paths"


export async function deleteCommentAudioPost(id:string, audioPostId: string){
    await db.comment.delete({where:{id}})
    revalidatePath(`${paths.imgPostShow(audioPostId)}`)

}