import { combineSlices } from "@reduxjs/toolkit";

import { Schema } from "./schema";

// reducers
import { $api } from "@/shared/api";

export const reducers = combineSlices($api, {}).withLazyLoadedSlices<Schema>();
