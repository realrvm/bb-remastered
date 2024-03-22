import { $api } from "@/shared/api";

import { RegisterSchema } from "../types";

const registerApi = $api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterSchema, RegisterSchema>({
      query(regData) {
        return {
          method: "POST",
          url: "/register/",
          body: regData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const useRegisterApi = registerApi.useRegisterMutation;
