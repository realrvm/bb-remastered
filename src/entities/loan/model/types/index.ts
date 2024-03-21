import { Months } from "@/shared/lib/types";

export type LoanSchema = {
  term: Months;
  funding: number;
};
