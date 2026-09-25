import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-coburg");

export default function Page() {
  return <LocationPageView slug="foodtruck-coburg" />;
}