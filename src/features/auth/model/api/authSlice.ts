import { ZodError } from "zod";

import { createSlice } from "@reduxjs/toolkit";

import { AuthSchema } from "../types";
import { accessTokenSchema, refreshTokenSchema } from "../../config/schema";

const initialState: AuthSchema = {
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    setAccessToken: create.reducer<{ access: string }>((state, { payload }) => {
      try {
        accessTokenSchema.parse(payload.access);

        state.accessToken = payload.access;
      } catch (e) {
        if (e instanceof ZodError) {
          console.log(e.errors[0].message);
        }
      }

      state.accessToken = "";
    }),
    setRefreshToken: create.reducer<{ refresh: string }>(
      (state, { payload }) => {
        try {
          refreshTokenSchema.parse(payload.refresh);

          state.refreshToken = payload.refresh;
        } catch (e) {
          if (e instanceof ZodError) {
            console.log(e.errors[0].message);
          }
        }
        state.refreshToken = "";
      },
    ),
  }),
  selectors: {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.accessToken,
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;

export const { getAccessToken, getRefreshToken } = authSlice.selectors;
