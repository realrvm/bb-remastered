import { ZodError } from "zod";

import { $api } from "@/shared/api";
import { ConfigSchema } from "../types";
import { configApprovalSchema, configRateSchema } from "../../config/schema";
import { CONFIG_PATH, CUSTOM_INTEREST_RATE } from "@/shared/lib/constants";

const configApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getConfigRate: build.query<number, any>({
      query: () => ({
        url: `${CONFIG_PATH}/?name=INTEREST_RATE`,
      }),
      transformResponse: (response: Pick<ConfigSchema, "value">[]) => {
        const interestRate = response[0].value;
        try {
          configRateSchema.parse(interestRate);

          return interestRate;
        } catch (e) {
          if (e instanceof ZodError) {
            console.error(e.errors[0].message);
          }
        }

        return CUSTOM_INTEREST_RATE;
      },
    }),
    getConfigApprovalProb: build.query<ConfigSchema[], void>({
      query: () => ({
        url: `${CONFIG_PATH}/?name=APPROVAL_PROB`,
      }),
      transformResponse: (response: ConfigSchema[]) => {
        const result: ConfigSchema[] = [];

        response.forEach((e) => {
          result.push({ help_text: e.help_text, value: e.value });
        });

        try {
          configApprovalSchema.parse(result);

          return result;
        } catch (e) {
          if (e instanceof ZodError) {
            console.error(e.errors[0].message);
          }
        }

        return [];
      },
    }),
  }),
  overrideExisting: false,
});

export const useGetConfigRate = configApi.useGetConfigRateQuery;
export const useGetConfigApprovalProb = configApi.useGetConfigApprovalProbQuery;
