"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Building2, MapPin, Phone, Mail, Globe, Flag, Loader2, Clock } from "lucide-react";
import { geocodePostcode } from "@/lib/geolocation";
import { searchCities } from "@/lib/uk-cities";
import { WeekHours, parseOpeningHours, formatOpeningHours } from "@/lib/garage-settings";

interface Garage {
  id: string;
  name: string;
  ownerName: string;
  slug?: string | null;
  isPublic?: boolean;
  shortDescription?: string | null;
  description?: string | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  postcode?: string | null;
  city?: string | null;
  county?: string | null;
  openingHours?: string | null;
  logoUrl?: string | null;
  vatEnabled?: boolean;
}

export default function GeneralSettings() {
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [cityVerified, setCityVerified] = useState(false);
  const [countyVerified, setCountyVerified] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [openingHours, setOpeningHours] = useState<WeekHours>({
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "14:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: true },
  });

  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    slug: "",
    isPublic: true,
    shortDescription: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    county: "",
    vatEnabled: true,
  });
  const [initialFormData, setInitialFormData] = useState(formData);
  const [initialOpeningHours, setInitialOpeningHours] = useState(openingHours);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/garages/me", {
          credentials: "include",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setGarage(data);
          updateFormData(data);
          localStorage.setItem("garage-data", JSON.stringify(data));
          return;
        }

        localStorage.removeItem("garage-data");
        setGarage(null);
        setSaveMessage("Unable to load your garage. Please log in again.");
      } catch (error) {
        console.error("Error loading garage:", error);
        localStorage.removeItem("garage-data");
        setGarage(null);
        setSaveMessage("Unable to load your garage. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateFormData = (current: Garage) => {
    const nextFormData = {
      name: current.name || "",
      ownerName: current.ownerName || "",
      slug: current.slug || "",
      isPublic: current.isPublic ?? true,
      shortDescription: current.shortDescription || "",
      description: current.description || "",
      website: current.website || "",
      phone: current.phone || "",
      email: current.email || "",
      address: current.address || "",
      postcode: current.postcode || "",
      city: current.city || "",
      county: current.county || "",
      vatEnabled: current.vatEnabled ?? true,
    };
    const nextOpeningHours = parseOpeningHours(current.openingHours);
    setFormData(nextFormData);
    setOpeningHours(nextOpeningHours);
    setInitialFormData(nextFormData);
    setInitialOpeningHours(nextOpeningHours);
  };

  const hasUnsavedChanges =
    JSON.stringify(formData) !== JSON.stringify(initialFormData) ||
    JSON.stringify(openingHours) !== JSON.stringify(initialOpeningHours);

  const handleDiscard = () => {
    setFormData(initialFormData);
    setOpeningHours(initialOpeningHours);
    setSaveMessage(null);
  };

  const handleGeocodePostcode = async (postcode: string) => {
    if (!postcode || postcode.length < 5) {
      setVerificationStatus('idle');
      setVerificationMessage('');
      setCityVerified(false);
      setCountyVerified(false);
      return;
    }

    setVerificationStatus('verifying');
    setVerificationMessage('Verifying...');
    
    try {
      const data = await geocodePostcode(postcode);
      if (data) {
        setVerificationStatus('success');
        setVerificationMessage(`Verified: ${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`);
        
        if (data.city) {
          setFormData(prev => ({ ...prev, city: data.city || '' }));
          setCityVerified(true);
        }
        if (data.county) {
          setFormData(prev => ({ ...prev, county: data.county || '' }));
          setCountyVerified(true);
        }
      } else {
        setVerificationStatus('error');
        setVerificationMessage('Invalid UK postcode');
        setCityVerified(false);
        setCountyVerified(false);
      }
    } catch (error) {
      setVerificationStatus('error');
      setVerificationMessage('Verification failed');
      setCityVerified(false);
      setCountyVerified(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.postcode) {
        handleGeocodePostcode(formData.postcode);
      } else {
        setVerificationStatus('idle');
        setVerificationMessage('');
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [formData.postcode]);

  const handleSave = async () => {
    if (!garage) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const updateData: Record<string, any> = {
        name: formData.name,
        ownerName: formData.ownerName,
        slug: formData.slug,
        isPublic: formData.isPublic,
        shortDescription: formData.shortDescription,
        description: formData.description,
        website: formData.website,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        postcode: formData.postcode,
        city: formData.city,
        county: formData.county,
        openingHours: formatOpeningHours(openingHours),
        vatEnabled: formData.vatEnabled,
      };

      if (formData.postcode && formData.postcode.trim()) {
        const coords = await geocodePostcode(formData.postcode);
        if (coords) {
          updateData.latitude = coords.latitude;
          updateData.longitude = coords.longitude;
        }
      }

      let response = await fetch(`/api/garages/${garage.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (response.status === 403) {
        const meRes = await fetch("/api/garages/me", {
          credentials: "include",
          cache: "no-store",
        });
        if (meRes.ok) {
          const meGarage = await meRes.json();
          if (meGarage?.id && meGarage.id !== garage.id) {
            response = await fetch(`/api/garages/${meGarage.id}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updateData),
            });
          }
        }
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      let persisted = data;
      try {
        const meRes = await fetch("/api/garages/me", {
          credentials: "include",
          cache: "no-store",
        });
        if (meRes.ok) {
          persisted = await meRes.json();
        }
      } catch (error) {
        // Keep PUT response as source of truth when /me read fails
      }

      setGarage(persisted);
      updateFormData(persisted);
      localStorage.setItem("garage-data", JSON.stringify(persisted));
      setInitialFormData({
        name: persisted.name || "",
        ownerName: persisted.ownerName || "",
        slug: persisted.slug || "",
        isPublic: persisted.isPublic ?? true,
        shortDescription: persisted.shortDescription || "",
        description: persisted.description || "",
        website: persisted.website || "",
        phone: persisted.phone || "",
        email: persisted.email || "",
        address: persisted.address || "",
        postcode: persisted.postcode || "",
        city: persisted.city || "",
        county: persisted.county || "",
        vatEnabled: persisted.vatEnabled ?? true,
      });
      setInitialOpeningHours(parseOpeningHours(persisted.openingHours));
      setSaveMessage("✓ Saved successfully.");
      
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <Card className="p-4 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Business Information</h3>
            <p className="text-sm text-slate-500">Basic information about your garage</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            List in public directory
          </label>
        </div>

        <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-sm font-bold text-slate-900">VAT Settings</p>
              <p className="text-xs text-slate-600">Turn VAT on/off for new jobs, invoices, and quotes.</p>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={formData.vatEnabled}
                onChange={(e) => setFormData((prev) => ({ ...prev, vatEnabled: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              VAT enabled
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Garage Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const nextName = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  name: nextName,
                  slug: toSlug(nextName),
                }));
              }}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Owner Name</label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => setFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Public Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: toSlug(e.target.value) }))}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
              placeholder="your-garage-name"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              Public URL: /garages/{formData.slug || "your-garage"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description (SEO)</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
              placeholder="Independent garage specializing in MOT and servicing."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description</label>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
              placeholder="Tell customers about your garage, experience, and services."
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="text-blue-600" size={24} />
            Contact & Location
          </h3>
          <p className="text-sm text-slate-500 mt-1">Your location helps customers find you</p>
        </div>

        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-blue-600" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
                placeholder="e.g., 020 1234 5678"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
                placeholder="e.g., info@yourgarage.co.uk"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Globe size={16} className="text-blue-600" />
              Website (optional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
              placeholder="e.g., https://www.yourgarage.co.uk"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Flag size={16} className="text-blue-600" />
              Country
            </label>
            <div className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 font-medium flex items-center gap-2">
              🇬🇧 United Kingdom
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Building2 size={16} className="text-blue-600" />
              Street Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 transition-colors"
              placeholder="e.g., 123 High Street"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Postcode
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, postcode: e.target.value.toUpperCase() }))}
                  className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-12 transition-colors"
                  placeholder="SW1A 1AA"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {verificationStatus === 'verifying' && (
                    <Loader2 size={20} className="animate-spin text-blue-600" />
                  )}
                  {verificationStatus === 'success' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  )}
                  {verificationStatus === 'error' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m15 9-6 6"/>
                      <path d="m9 9 6 6"/>
                    </svg>
                  )}
                </div>
              </div>
              {verificationMessage && (
                <p className={`text-xs mt-1.5 font-medium ${
                  verificationStatus === 'success' ? 'text-emerald-600' : 
                  verificationStatus === 'error' ? 'text-red-600' : 
                  'text-blue-600'
                }`}>
                  {verificationMessage}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                City / Town
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({ ...prev, city: value }));
                    setCityVerified(false);
                    if (value.length >= 2) {
                      const suggestions = searchCities(value, 8);
                      setCitySuggestions(suggestions);
                      setShowCitySuggestions(suggestions.length > 0);
                    } else {
                      setShowCitySuggestions(false);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                  onFocus={() => {
                    if (formData.city && formData.city.length >= 2) {
                      const suggestions = searchCities(formData.city, 8);
                      setCitySuggestions(suggestions);
                      setShowCitySuggestions(suggestions.length > 0);
                    }
                  }}
                  className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 transition-colors"
                  placeholder="e.g., London"
                  autoComplete="off"
                />
                {cityVerified && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                )}
              </div>
              {showCitySuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {citySuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, city }));
                        setShowCitySuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {cityVerified && (
                <p className="text-xs text-emerald-600 mt-1.5 font-medium">
                  ✓ Auto-filled from verified postcode
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                County
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.county}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, county: e.target.value }));
                    setCountyVerified(false);
                  }}
                  className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 pr-10 transition-colors"
                  placeholder="e.g., Greater London"
                />
                {countyVerified && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                )}
              </div>
              {countyVerified && (
                <p className="text-xs text-emerald-600 mt-1.5 font-medium">
                  ✓ Auto-filled from verified postcode
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="text-violet-600" size={24} />
            Opening Hours
          </h3>
          <p className="text-sm text-slate-500 mt-1">Set your business hours for each day</p>
        </div>

        <div className="space-y-4">
          {Object.entries(openingHours).map(([day, hours]) => (
            <div key={day} className="flex flex-col gap-3 p-3 lg:p-4 border-2 border-slate-200 rounded-lg hover:border-violet-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 capitalize">{day}</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hours.closed}
                    onChange={(e) => setOpeningHours({
                      ...openingHours,
                      [day]: { ...hours, closed: e.target.checked }
                    })}
                    className="w-5 h-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700">Closed</span>
                </label>
              </div>
              
              {!hours.closed && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600 w-10">Open</label>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setOpeningHours({
                        ...openingHours,
                        [day]: { ...hours, open: e.target.value }
                      })}
                      className="border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    />
                  </div>
                  <span className="text-slate-400 hidden sm:block">-</span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600 w-12">Close</label>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setOpeningHours({
                        ...openingHours,
                        [day]: { ...hours, close: e.target.value }
                      })}
                      className="border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-4 border-t-2 border-slate-200">
            <button
              type="button"
              onClick={() => {
                const weekdayHours = { open: "09:00", close: "17:00", closed: false };
                setOpeningHours({
                  monday: weekdayHours,
                  tuesday: weekdayHours,
                  wednesday: weekdayHours,
                  thursday: weekdayHours,
                  friday: weekdayHours,
                  saturday: { open: "09:00", close: "14:00", closed: false },
                  sunday: { open: "09:00", close: "17:00", closed: true },
                });
              }}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-semibold text-xs sm:text-sm transition-colors"
            >
              🕒 Standard Hours (9-5 Mon-Fri)
            </button>
            <button
              type="button"
              onClick={() => {
                const samehours = openingHours.monday;
                setOpeningHours({
                  monday: samehours,
                  tuesday: samehours,
                  wednesday: samehours,
                  thursday: samehours,
                  friday: samehours,
                  saturday: samehours,
                  sunday: samehours,
                });
              }}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs sm:text-sm transition-colors"
            >
              🔄 Copy Monday to All Days
            </button>
          </div>
        </div>
      </Card>

      {saveMessage && (
        <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
          saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {saveMessage}
        </div>
      )}

      {hasUnsavedChanges && (
        <div className="fixed left-0 right-0 bottom-16 lg:bottom-0 lg:left-64 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
            <p className="text-sm font-medium text-slate-700">You have unsaved changes</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-60"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
