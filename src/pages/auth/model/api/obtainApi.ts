import { $api } from "@/shared/api";

import { ObtainRequestSchema, ObtainResponseSchema } from "../types";

const obtainApi = $api.injectEndpoints({
  endpoints: (build) => ({
    obtain: build.mutation<ObtainResponseSchema, ObtainRequestSchema>({
      query(obtainData) {
        return {
          method: "POST",
          url: "/token/obtain/",
          body: obtainData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const useObtainApi = obtainApi.useObtainMutation;
