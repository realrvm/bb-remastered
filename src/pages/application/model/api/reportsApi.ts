import { $api } from "@/shared/api";
import { ReportsMakePlateSchema, ReportsRetrieveSchema } from "../types";

const reportsApi = $api.injectEndpoints({
  endpoints: (build) => ({
    initiateReport: build.query<ReportsMakePlateSchema, { plate: string }>({
      query: ({ plate }) => ({
        url: `/reports/make/${plate}/`,
      }),
    }),
    getRetrievedReport: build.query<ReportsRetrieveSchema, { id: string }>({
      query: ({ id }) => ({ url: `/reports/retrieve/${id}` }),
    }),
  }),
  overrideExisting: false,
});

export const useInitiateReport = reportsApi.useLazyInitiateReportQuery;
export const useGetRetrievedReport = reportsApi.useLazyGetRetrievedReportQuery;
