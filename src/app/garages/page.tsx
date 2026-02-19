import type { Metadata } from "next";
import GaragesClient from "./GaragesClient";

export const metadata: Metadata = {
  title: "Find Your Perfect Garage | UK Garage Directory | Garage Boost",
  description:
    "Discover trusted UK garages near you. Search by location, postcode, or browse our verified directory. Compare services, ratings, and contact details.",
};

export default function GaragesPage() {
  return <GaragesClient />;
}
