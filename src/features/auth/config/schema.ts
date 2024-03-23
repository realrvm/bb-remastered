import { z } from "zod";

export const tokenSchema = z.object({
  access: z.string().min(1),
  refresh: z.string().optional(),
});
