"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";
export async function deletePost(id: string, userId:string) {
  await db.textPost.delete({ where: { id } });
    revalidatePath(`${paths.userPostsPage(userId)}`);
    redirect(`${paths.userPostsPage(userId)}`);
}
