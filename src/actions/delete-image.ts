'use server'

import { db } from "@/db";


export async function deleteImg(id:string){
    await db.image.delete({where: {id}})

}