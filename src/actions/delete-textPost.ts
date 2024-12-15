"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";
export async function deletePost(id: string) {
  await db.textPost.delete({ where: { id } }),
    revalidatePath(`${paths.textPostsListPage()}`),
    redirect(`${paths.textPostsListPage()}`);
}
