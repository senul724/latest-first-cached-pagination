import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `pm_${name}`);

export const posts = createTable(
  "verse",
  {
    id: serial("id").primaryKey(),
    content: varchar("name", { length: 500 }).notNull(),
    createdBy: varchar("created_by", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    verseIdx: index("verse_idx").on(table.id),
    creatorIdx: index("creator_idx").on(table.createdBy),
  }),
);
