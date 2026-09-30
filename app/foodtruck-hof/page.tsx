import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-hof");

export default function Page() {
  return <LocationPageView slug="foodtruck-hof" />;
}
