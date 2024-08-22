import { count } from "drizzle-orm";
import { db } from "~/server/db";
import { dialouges } from "~/server/db/schema";
import { redis } from "~/server/redis/init";

export const LIMIT_PER_PAGE = 10;

export const calculatePageCount = (records: number) => {
  const pages = Math.floor(records / LIMIT_PER_PAGE);

  return pages > 0 ? pages : 1;
};

export const getTotalPages = async (): Promise<
  { pages: number; err: boolean }
> => {
  try {
    const pages = Number(await redis.get("pages"));

    return { pages: pages ?? 0, err: false };
  } catch {
    return { pages: 0, err: true };
  }
};

export const pageLimitAndOffset = async (
  pageNo: number,
): Promise<{ offset: number; limit: number; total: number; err: boolean }> => {
  try {
    const pages = Number(await redis.get("pages"));
    if (!pages || pageNo > pages) {
      return { offset: 0, limit: 0, total: 0, err: true };
    }

    const records = Number(await redis.get("records"));
    if (!records) {
      return { offset: 0, limit: 0, total: 0, err: true };
    }

    const offset = (pageNo - 1) * LIMIT_PER_PAGE;
    let limit = LIMIT_PER_PAGE;

    if (pageNo === pages) {
      limit = records - offset;
    }

    return { offset, limit, total: pages, err: false };
  } catch {
    return { offset: 0, limit: 0, total: 0, err: true };
  }
};

export const getCountFromDb = async () => {
  const data = await db.select({ count: count() }).from(dialouges);

  if (!data[0]) {
    return { count: 0, err: true };
  }

  return { count: data[0].count, err: false };
};
