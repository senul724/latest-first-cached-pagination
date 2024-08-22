"use server";

import { calculatePageCount } from "~/utils/pages";
import { db } from "../db";
import { dialouges } from "../db/schema";
import { redis } from "../redis/init";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addContent(
  args: { content: string; createdBy?: string; totalPages: number },
) {
  const { content, createdBy, totalPages } = args;
  await db.insert(dialouges).values({ content, createdBy });

  const records = await redis.incr("records");
  const newPageTotal = calculatePageCount(records);

  revalidatePath(`/desc/${totalPages}`);

  if (newPageTotal > totalPages) {
    await redis.incr("pages");
    revalidatePath("/desc", "layout");
    redirect('/view/1')
  }
}
