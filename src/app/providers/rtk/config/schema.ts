import { LoanSchema } from "@/entities/loan";
import { PhoneSchema } from "@/entities/phone";
import { TargetPageSchema } from "@/entities/target-page";
import { AuthSchema } from "@/features/auth";
import { $api } from "@/shared/api";

export type Schema = {
  loan: LoanSchema;
  auth: AuthSchema;
  phone: PhoneSchema;
  targetPage: TargetPageSchema;
  [$api.reducerPath]: ReturnType<typeof $api.reducer>;
};
