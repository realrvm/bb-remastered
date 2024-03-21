import { LoanSchema } from "@/entities/loan";
import { AuthSchema } from "@/features/auth";
import { $api } from "@/shared/api";

export type Schema = {
  loan: LoanSchema;
  auth: AuthSchema;
  [$api.reducerPath]: ReturnType<typeof $api.reducer>;
};
