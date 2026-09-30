import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-schweinfurt");

export default function Page() {
  return <LocationPageView slug="foodtruck-schweinfurt" />;
}
