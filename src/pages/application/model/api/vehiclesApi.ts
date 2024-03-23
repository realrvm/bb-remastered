import { $api } from "@/shared/api";
import { ModelObjectRequest, ModelObjectResponse } from "../types";

const vehiclesApi = $api
  .enhanceEndpoints({ addTagTypes: ["Vehicles"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getModel: build.query<any, string>({
        query: (id: string) => ({
          url: `/vehicles/models/?make=${id}`,
        }),
      }),
      createModelObject: build.mutation<
        ModelObjectResponse,
        ModelObjectRequest
      >({
        query: (body) => ({
          url: "/vehicles/",
          method: "POST",
          body,
        }),
      }),
      getListVehiclesBrands: build.query<any, void>({
        query: () => ({
          url: "/vehicles/makes/",
        }),
      }),
      getUrlImagesPresign: build.mutation<
        { url: string },
        { uid: string; file_name: string }
      >({
        query: ({ file_name, uid }) => ({
          url: `/vehicles/${uid}/images/presign/`,
          method: "POST",
          body: { file_name },
        }),
      }),
    }),
    overrideExisting: false,
  });

export const useGetModel = vehiclesApi.useLazyGetModelQuery;
export const useCreateModel = vehiclesApi.useCreateModelObjectMutation;
export const useGetPresign = vehiclesApi.useGetUrlImagesPresignMutation;
export const useGetBrands = vehiclesApi.useLazyGetListVehiclesBrandsQuery;
