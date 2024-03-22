import { createSlice } from "@reduxjs/toolkit";

import { TargetPageSchema } from "../types";
import { TargetPages } from "@/shared/lib/enums";

const initialState: TargetPageSchema = {
  targetPage: TargetPages.INITIAL,
};

const targetPageSlice = createSlice({
  name: "targetPage",
  initialState,
  reducers: (create) => ({
    setTargetPage: create.reducer<TargetPages>((state, { payload }) => {
      state.targetPage = payload;
    }),
  }),
  selectors: {
    getTargetPage: (state) => state.targetPage,
  },
});

export const { reducer: targetPageReducer, actions: targetPageActions } =
  targetPageSlice;

export const { getTargetPage } = targetPageSlice.selectors;
