import { combineSlices } from "@reduxjs/toolkit";

import { Schema } from "./schema";

// reducers
import { $api } from "@/shared/api";
import { loanReducer } from "@/entities/loan";
import { authReducer } from "@/features/auth";

export const reducers = combineSlices($api, {
  loan: loanReducer,
  auth: authReducer,
}).withLazyLoadedSlices<Schema>();
