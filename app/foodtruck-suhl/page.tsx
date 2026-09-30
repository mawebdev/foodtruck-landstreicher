import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-suhl");

export default function Page() {
  return <LocationPageView slug="foodtruck-suhl" />;
}
