import { z } from "zod";

export const refreshTokenSchema = z.string().min(1);

export const accessTokenSchema = z.string().min(1);
