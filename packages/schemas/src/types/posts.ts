import { z } from "zod";
import { insertPostParams, deletePostParams } from "../validations";

export type InsertPostParams = z.infer<typeof insertPostParams>;
export type DeletePostParams = z.infer<typeof deletePostParams>;
