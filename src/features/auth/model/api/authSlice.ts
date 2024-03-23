import { ZodError } from "zod";

import { createSlice } from "@reduxjs/toolkit";

import { AuthSchema } from "../types";
import { tokenSchema } from "../../config/schema";
import { STORAGE, STORAGE_TOKEN } from "@/shared/lib/constants";

const initialState: AuthSchema = {
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    setAccessToken: create.reducer<{ access: string; refresh?: string }>(
      (state, { payload }) => {
        try {
          tokenSchema.parse(payload);

          state.accessToken = payload.access;

          if (payload.refresh) {
            const refreshToken = JSON.stringify(payload.refresh);
            STORAGE.setItem(STORAGE_TOKEN, refreshToken);
          }
        } catch (e) {
          if (e instanceof ZodError) {
            console.log(e.errors[0].message);
          }
        }
      },
    ),
  }),
  selectors: {
    getAccessToken: (state) => state.accessToken,
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;

export const { getAccessToken } = authSlice.selectors;
