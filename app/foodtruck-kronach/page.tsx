import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-kronach");

export default function Page() {
  return <LocationPageView slug="foodtruck-kronach" />;
}
