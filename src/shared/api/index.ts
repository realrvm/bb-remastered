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

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    console.log(state);
    // TODO
    const token = "";

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

      // TODO
      if (response.data) {
        console.log(response.data);
      }
    } finally {
      console.log("finally");
    }
  } else {
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const $api = createApi({
  reducerPath: "apiQuery",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
