import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-kitzingen");

export default function Page() {
  return <LocationPageView slug="foodtruck-kitzingen" />;
}
