import { LocationPageView, locationMetadata } from "@/components/LocationPageView";

export const metadata = locationMetadata("foodtruck-bayreuth");

export default function Page() {
  return <LocationPageView slug="foodtruck-bayreuth" />;
}