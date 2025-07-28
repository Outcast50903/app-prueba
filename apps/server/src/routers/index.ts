import {
  publicProcedure,
  router,
} from "../lib/trpc";
import { postRouter } from "./post";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  post: postRouter,
});
export type AppRouter = typeof appRouter;
