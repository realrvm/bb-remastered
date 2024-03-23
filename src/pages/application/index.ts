import { lazy } from "react";

const ApplicationCalculator = lazy(
  () => import("./ui/application-calculator/ApplicationCalculator"),
);
const ApplicationVehicle = lazy(
  () => import("./ui/application-vehicle/ApplicationVehicle"),
);
const ApplicationDocs = lazy(
  () => import("./ui/application-docs/ApplicationDocs"),
);
const ApplicationReview = lazy(
  () => import("./ui/application-review/ApplicationReview"),
);

export {
  ApplicationCalculator,
  ApplicationVehicle,
  ApplicationDocs,
  ApplicationReview,
};

export {
  useCreateModel,
  useGetPresign,
  useGetBrands,
  useGetModel,
} from "./model/api/vehiclesApi";
