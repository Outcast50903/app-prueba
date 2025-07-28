ALTER TABLE "todo" RENAME TO "post";--> statement-breakpoint
ALTER TABLE "post" RENAME COLUMN "text" TO "name";--> statement-breakpoint
ALTER TABLE "post" RENAME COLUMN "completed" TO "description";