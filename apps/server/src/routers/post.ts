import { router, publicProcedure } from "../lib/trpc";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { post, insertPostParams, deletePostParams } from "@workspace/schemas";
import { TRPCError } from "@trpc/server";

export const postRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(post);
  }),
  create: publicProcedure
    .input(insertPostParams)
    .mutation(async ({ input }) => {
      console.log("🚀 ~ input:", input);
      try {
        await db.insert(post).values({
          name: input.name.toString(),
          description: input.description.toString(),
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create post",
        });
      }
    }),
  delete: publicProcedure
    .input(deletePostParams)
    .mutation(async ({ input }) => {
      console.log("🚀 ~ input:", input);
      try {
        await db.delete(post).where(eq(post.id, Number(input.id)));
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete post",
        });
      }
    }),
});
