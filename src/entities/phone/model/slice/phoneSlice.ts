import { createSlice } from "@reduxjs/toolkit";

import { PhoneSchema } from "../types";

const initialState: PhoneSchema = {
  phone_number: "",
};

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: (create) => ({
    setPhone: create.reducer<string>((state, { payload }) => {
      state.phone_number = payload;
    }),
  }),
  selectors: {
    getPhoneNumber: (state) => state.phone_number,
  },
});

export const { reducer: phoneReducer, actions: phoneActions } = phoneSlice;

export const { getPhoneNumber } = phoneSlice.selectors;
