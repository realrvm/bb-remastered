import { z } from "zod";

export const phoneValueSchema = z.string().length(10);
