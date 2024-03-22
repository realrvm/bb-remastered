import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown,
): error is { data: { phone_number: string } } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    "phone_number" in (error as any).data &&
    typeof (error as any).data.phone_number === "string"
  );
}
