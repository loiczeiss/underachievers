"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"
import paths from "@/paths"


export async function deleteCommentTextPost(id:string, textPostId: string){
    await db.comment.delete({where:{id}})
    revalidatePath(`${paths.textPostShow(textPostId)}`)

}