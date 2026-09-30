import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-lauscha");

export default function Page() {
  return <LocationPageView slug="foodtruck-lauscha" />;
}
