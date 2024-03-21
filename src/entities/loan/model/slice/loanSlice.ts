import { createSlice } from "@reduxjs/toolkit";

import { LoanSchema } from "../types";

const initialState: LoanSchema = {
  term: "24",
  funding: 0,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: (create) => ({
    setLoan: create.reducer<LoanSchema>((state, { payload }) => {
      state.term = payload.term;
      state.funding = payload.funding;
    }),
  }),
  selectors: {
    getLoan: (state) => state.term,
  },
});

export const { reducer: loanReducer, actions: loanActions } = loanSlice;

export const { getLoan } = loanSlice.selectors;
