import { $api } from "@/shared/api";

import { ProfileResponseSchema } from "../types";

const profiletApi = $api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponseSchema, void>({
      query: () => "/profile/",
    }),
  }),
  overrideExisting: false,
});

export const useGetProfile = profiletApi.useLazyGetProfileQuery;
