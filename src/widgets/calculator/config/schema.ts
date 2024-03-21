import { z } from "zod";

const APPROVAL = [
  "high",
  "very high",
  "average",
  "высокая",
  "очень высокая",
  "средняя",
] as const;

export const configApprovalSchema = z
  .object({
    help_text: z.enum(APPROVAL),
    value: z.number(),
  })
  .array();

export const configRateSchema = z.number();
