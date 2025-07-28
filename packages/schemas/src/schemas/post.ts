import { text, serial } from "drizzle-orm/pg-core";
import { pgTable } from "./common";

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});
