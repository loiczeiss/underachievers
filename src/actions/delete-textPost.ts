'use server'

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id: string){
    await db.textPost.delete({where:{id}}),
    console.log("here")
    revalidatePath('/'), 
    redirect('/')
}