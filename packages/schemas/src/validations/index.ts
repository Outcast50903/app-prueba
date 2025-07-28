import { z } from "zod";

export const insertPostParams = z.object({
  name: z.string().min(1).max(64).trim(),
  description: z.string().min(1).max(256).trim(),
});

export const deletePostParams = z.object({
  id: z.number(),
});
