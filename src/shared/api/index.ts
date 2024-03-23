import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import {
  API_URL,
  STORAGE,
  STORAGE_TOKEN,
  TOKEN_REFRESH,
} from "@/shared/lib/constants";
import { RootState } from "@/app/providers/rtk/";
import { authActions } from "@/features/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const token = state.auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { dispatch } = api;

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const token = JSON.parse(
        STORAGE.getItem(STORAGE_TOKEN) || JSON.stringify(""),
      ) as string;

      const response = await baseQuery(
        {
          url: TOKEN_REFRESH,
          body: { refresh: token },
          method: "POST",
        },
        api,
        extraOptions,
      );

      if (response.data) {
        dispatch(
          authActions.setAccessToken({
            access: (response.data as { access: string }).access,
          }),
        );
        result = await baseQuery(args, api, extraOptions);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  return result;
};

export const $api = createApi({
  reducerPath: "apiQuery",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
