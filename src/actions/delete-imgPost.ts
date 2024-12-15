'use server'

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";
export async function deleteImgPost(id:string){
    await db.imgPost.delete({where: {id}})
    revalidatePath(`${paths.imgPostsListPage()}`)
    redirect(`${paths.imgPostsListPage()}`)
}