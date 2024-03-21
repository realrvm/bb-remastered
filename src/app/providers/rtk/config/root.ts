import { configureStore } from "@reduxjs/toolkit";

import { reducers } from "./reducers";

import type { Schema } from "./schema";
import { $api } from "@/shared/api";
import { IS_DEV } from "@/shared/lib/constants";

export function createReduxStore(initialState?: Schema) {
  const store = configureStore({
    reducer: reducers,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat($api.middleware),
  });

  return store;
}
