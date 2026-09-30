import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-sonneberg");

export default function Page() {
  return <LocationPageView slug="foodtruck-sonneberg" />;
}
