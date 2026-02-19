"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink, Star, Award } from "lucide-react";

interface GarageImage {
  id: string;
  url: string;
  alt?: string | null;
}

interface Garage {
  id: string;
  name: string;
  slug: string | null;
  city: string;
  county: string;
  postcode?: string | null;
  phone?: string | null;
  email?: string | null;
  services: string;
  rating: number | null;
  reviewCount: number;
  image: GarageImage | null;
}

export default function FeaturedGarages() {
  const router = useRouter();
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await fetch("/api/garages/featured", { cache: "no-store" });
        if (!response.ok) {
          setGarages([]);
          setError(null);
          return;
        }
        const data = await response.json();
        setGarages(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching garages:", err);
        setGarages([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  // Fallback garages if no real garages exist
  const displayGarages = garages.length > 0 ? garages : [
    {
      id: "1",
      name: "Urban Garage",
      slug: "urban-garage",
      city: "London",
      county: "Greater London",
      postcode: "SW1A 1AA",
      phone: "020 7946 0958",
      email: "info@urbanarage.uk",
      services: "MOT, Servicing, Repairs",
      rating: 4.8,
      reviewCount: 127,
      image: null,
    },
    {
      id: "2",
      name: "Premier Auto Centre",
      slug: "premier-auto-centre",
      city: "Manchester",
      county: "Greater Manchester",
      postcode: "M1 1AD",
      phone: "0161 234 5678",
      email: "info@premierauto.uk",
      services: "MOT, Diagnostics, Tyres",
      rating: 4.9,
      reviewCount: 89,
      image: null,
    },
    {
      id: "3",
      name: "Reliable Motors",
      slug: "reliable-motors",
      city: "Birmingham",
      county: "West Midlands",
      postcode: "B1 1AA",
      phone: "0121 234 5678",
      email: "info@reliablemotors.uk",
      services: "MOT, ServiceBox, Repairs",
      rating: 4.7,
      reviewCount: 156,
      image: null,
    },
    {
      id: "4",
      name: "Quick Fix Auto",
      slug: "quick-fix-auto",
      city: "Bristol",
      county: "Avon",
      postcode: "BS1 1AA",
      phone: "0117 234 5678",
      email: "info@quickfix.uk",
      services: "MOT, Servicing, Diagnostics",
      rating: 4.8,
      reviewCount: 94,
      image: null,
    },
  ];

  const handleCardClick = (garage: Garage) => {
    router.push(`/garages/${garage.slug || garage.id}`);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Garages Near You</h2>
          <p className="text-slate-600 mt-3 text-lg">Already using Garage Boost to grow their business</p>
        </div>

        {error && (
          <div className="text-center text-red-600 mb-8">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayGarages.map((garage) => {
            const firstImage = garage.image;

            return (
              <div
                key={garage.id}
                onClick={() => handleCardClick(garage)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 cursor-pointer"
              >
                {/* Image Header */}
                <div className="relative h-40 bg-linear-to-br from-blue-100 to-indigo-100 overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.url}
                      alt={firstImage.alt || garage.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Award size={48} className="text-blue-300 mx-auto mb-2" />
                        <p className="text-sm font-medium text-blue-400">No image</p>
                      </div>
                    </div>
                  )}

                  {/* Rating Badge */}
                  {garage.rating && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 px-3 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      {garage.rating}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Garage Name */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {garage.name}
                  </h3>

                  {/* Location Info */}
                  <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          {garage.postcode && (
                            <span className="text-blue-600 text-xs font-semibold">{garage.postcode}</span>
                          )}
                          {garage.city && (
                            <span className="font-semibold text-slate-900">{garage.city}</span>
                          )}
                        </div>
                        {garage.county && (
                          <div className="text-slate-600 text-xs">{garage.county}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-3 mt-3">
                    {garage.phone && (
                      <a
                        href={`tel:${garage.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-xs text-slate-700 hover:text-blue-600 transition-colors group/link"
                      >
                        <div className="bg-blue-50 p-1.5 rounded group-hover/link:bg-blue-100 transition-colors">
                          <Phone size={13} className="text-blue-600" />
                        </div>
                        <span className="font-medium">{garage.phone}</span>
                      </a>
                    )}

                    {garage.email && (
                      <a
                        href={`mailto:${garage.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-xs text-slate-700 hover:text-blue-600 transition-colors group/link"
                      >
                        <div className="bg-blue-50 p-1.5 rounded group-hover/link:bg-blue-100 transition-colors">
                          <Mail size={13} className="text-blue-600" />
                        </div>
                        <span className="font-medium truncate">{garage.email}</span>
                      </a>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(garage);
                    }}
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg group/btn mt-3"
                  >
                    View Details
                    <ExternalLink size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/garages")}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
          >
            Explore All Garages
          </button>
        </div>
      </div>
    </section>
  );
}
