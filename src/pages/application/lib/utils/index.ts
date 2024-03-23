import {
  CORRECT_PLATE_LENGTH,
  LONG_REGION_NUMBER,
  SHORT_REGION_NUMBER,
} from "@/shared/lib/constants";

export function isPlateTheRequiredLength(
  plate: string,
  region: string,
): boolean {
  return (
    plate.length === CORRECT_PLATE_LENGTH &&
    (region.length === SHORT_REGION_NUMBER ||
      region.length === LONG_REGION_NUMBER)
  );
}
