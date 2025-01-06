"use server"



import { db } from "@/db"
import { useRouter } from "next/router"


export async function deleteLike(id: string){
const router = useRouter()
    await db.like.delete({where:{id}})
    router.reload()
}