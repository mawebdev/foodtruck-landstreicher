import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-bamberg");

export default function Page() {
  return <LocationPageView slug="foodtruck-bamberg" />;
}