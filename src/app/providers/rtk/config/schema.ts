import { $api } from "@/shared/api";

export type Schema = {
  [$api.reducerPath]: ReturnType<typeof $api.reducer>;
};
