"use client";

import PublicLayout from "@/components/layout/PublicLayout";
import { Search, MapPin, Phone, Mail, ExternalLink, Star, Globe, Navigation, Award, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentPosition, sortByDistance, geocodePostcode } from "@/lib/geolocation";

interface GarageImage {
  id: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
}

interface Garage {
  id: string;
  name: string;
  slug?: string | null;
  postcode?: string | null;
  city?: string | null;
  county?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  rating?: number;
  reviewCount?: number;
  images?: GarageImage[];
}

export default function GaragesClient() {
  const router = useRouter();
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [postcodeSearch, setPostcodeSearch] = useState("");
  const [searchingPostcode, setSearchingPostcode] = useState(false);

  useEffect(() => {
    fetchGarages();

    const onFocus = () => {
      fetchGarages();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchGarages();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const fetchGarages = async () => {
    try {
      const res = await fetch("/api/garages", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setGarages(data);
      }
    } catch (error) {
      console.error("Failed to fetch garages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindNearest = async () => {
    setFindingLocation(true);
    try {
      const position = await getCurrentPosition();
      setUserLocation(position);
      setSearchTerm(""); // Clear text search when using location
    } catch (error) {
      alert("Could not get your location. Please enable location access or try searching by postcode.");
      console.error("Geolocation error:", error);
    } finally {
      setFindingLocation(false);
    }
  };

  const handlePostcodeSearch = async () => {
    if (!postcodeSearch.trim()) return;
    
    setSearchingPostcode(true);
    try {
      const coords = await geocodePostcode(postcodeSearch);
      if (coords) {
        setUserLocation(coords);
        setSearchTerm(""); // Clear text search when using location
      } else {
        alert("Could not find that postcode. Please check and try again.");
      }
    } catch (error) {
      alert("Failed to search postcode. Please try again.");
      console.error("Postcode search error:", error);
    } finally {
      setSearchingPostcode(false);
    }
  };

  const clearLocation = () => {
    setUserLocation(null);
    setPostcodeSearch("");
  };

  const handleCardNavigate = (
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    targetSlug?: string | null,
    targetId?: string
  ) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("a,button")) return;
    const slug = targetSlug || targetId;
    if (slug) {
      router.push(`/garages/${slug}`);
    }
  };

  const filteredGarages = garages.filter((garage) =>
    [garage.name, garage.postcode, garage.address, garage.city, garage.county]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const garagesWithCoordinates = filteredGarages.map((garage) => ({
    ...garage,
    latitude: garage.latitude ?? null,
    longitude: garage.longitude ?? null,
  }));

  // Sort by distance if user location is available
  const displayGarages = userLocation
    ? sortByDistance(garagesWithCoordinates, userLocation.latitude, userLocation.longitude)
    : garagesWithCoordinates.map(g => ({ ...g, distance: null }));

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-black mb-4 tracking-tight">Find Your Perfect Garage</h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Discover trusted UK garages near you. Search by location, postcode, or browse our verified directory.
              </p>
            </div>
            
            {/* Enhanced Search Section */}
            <div className="max-w-3xl mx-auto">
              {/* Main Search Bar */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      if (e.target.value) clearLocation();
                    }}
                    placeholder="Search by garage name, city, or area..."
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-slate-900 text-base font-medium focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                  <button
                    onClick={handleFindNearest}
                    disabled={findingLocation}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50 cursor-pointer"
                    title="Use my location"
                  >
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garages Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-slate-600 font-medium">Loading garages...</p>
            </div>
          ) : displayGarages.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl shadow-sm">
              <div className="bg-slate-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                <MapPin className="text-slate-400" size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">No garages found</h2>
              <p className="text-lg text-slate-600">
                {searchTerm ? "Try a different search term or clear filters" : "No garages are currently listed"}
              </p>
            </div>
          ) : (
            <>
              {/* Results Info Bar */}
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-slate-600 text-sm">
                    <span className="font-semibold text-slate-900">{displayGarages.length}</span> {displayGarages.length === 1 ? "Garage" : "Garages"}
                  </p>
                  {searchTerm && (
                    <p className="text-slate-500 text-sm">for <span className="text-slate-900">&quot;{searchTerm}&quot;</span></p>
                  )}
                  {userLocation && (
                    <p className="text-emerald-600 text-sm">• Sorted by proximity</p>
                  )}
                </div>
              </div>

              {/* Garages Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayGarages.map((garage) => {
                  const firstImage = garage.images && garage.images.length > 0 ? garage.images[0] : null;
                  
                  return (
                    <div
                      key={garage.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 cursor-pointer"
                      role="link"
                      tabIndex={0}
                      aria-label={`View ${garage.name}`}
                      onClick={(event) => handleCardNavigate(event, garage.slug, garage.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleCardNavigate(event, garage.slug, garage.id);
                        }
                      }}
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
                              <p className="text-sm font-medium text-blue-400">No image available</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Distance Badge */}
                        {garage.distance !== null && (
                          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                            <MapPin size={14} />
                            {garage.distance} mi
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
                              {garage.address && !garage.city && (
                                <div className="text-slate-600 text-sm line-clamp-2">{garage.address}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-3 mt-3">
                          {garage.phone && (
                            <a
                              href={`tel:${garage.phone}`}
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
                        <Link
                          href={`/garages/${garage.slug || garage.id}`}
                          className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg group/btn mt-3"
                        >
                          View Details
                          <ExternalLink size={15} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <Award className="mx-auto text-blue-300 mb-6" size={64} />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Own a Garage? Join Garage Boost
              </h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Get listed in our directory and access powerful CRM tools, automated reminders, 
                online booking, and more to grow your garage business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pricing"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-xl transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  Get Started Free
                </a>
                <a
                  href="/features"
                  className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur text-white font-bold py-5 px-10 rounded-xl transition-all border-2 border-white/30 text-lg"
                >
                  View Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
