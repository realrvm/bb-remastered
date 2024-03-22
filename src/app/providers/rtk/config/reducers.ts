import { combineSlices } from "@reduxjs/toolkit";

import { Schema } from "./schema";

// reducers
import { $api } from "@/shared/api";
import { loanReducer } from "@/entities/loan";
import { authReducer } from "@/features/auth";
import { phoneReducer } from "@/entities/phone";
import { targetPageReducer } from "@/entities/target-page";

export const reducers = combineSlices($api, {
  loan: loanReducer,
  auth: authReducer,
  phone: phoneReducer,
  targetPage: targetPageReducer,
}).withLazyLoadedSlices<Schema>();
