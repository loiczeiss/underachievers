"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"
import paths from "@/paths"

export async function deleteReply(id: string, postId)