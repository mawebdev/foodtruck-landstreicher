import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-nuernberg");

export default function Page() {
  return <LocationPageView slug="foodtruck-nuernberg" />;
}