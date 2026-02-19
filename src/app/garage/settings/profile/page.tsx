"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Wrench, Award, Star, Coffee, ImagePlus, Trash2 } from "lucide-react";
import { COMMON_SERVICES, COMMON_SPECIALTIES, COMMON_CERTIFICATIONS, COMMON_AMENITIES } from "@/lib/garage-settings";
import Image from "next/image";

const MAX_IMAGES = 3;
const MAX_IMAGE_MB = 1;

interface GarageImage {
  id: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
}

interface Garage {
  id: string;
  name: string;
  services?: string | null;
  specialties?: string | null;
  certifications?: string | null;
  amenities?: string | null;
  images: GarageImage[];
}

export default function ProfileSettings() {
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [initialServices, setInitialServices] = useState<string[]>([]);
  const [initialSpecialties, setInitialSpecialties] = useState<string[]>([]);
  const [initialCertifications, setInitialCertifications] = useState<string[]>([]);
  const [initialAmenities, setInitialAmenities] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const current = JSON.parse(cached);
          setGarage({ ...current, images: current.images || [] });
          const services = current.services ? current.services.split(",").map((s: string) => s.trim()) : [];
          const specialties = current.specialties ? current.specialties.split(",").map((s: string) => s.trim()) : [];
          const certifications = current.certifications ? current.certifications.split(",").map((s: string) => s.trim()) : [];
          const amenities = current.amenities ? current.amenities.split(",").map((s: string) => s.trim()) : [];
          setSelectedServices(services);
          setSelectedSpecialties(specialties);
          setSelectedCertifications(certifications);
          setSelectedAmenities(amenities);
          setInitialServices(services);
          setInitialSpecialties(specialties);
          setInitialCertifications(certifications);
          setInitialAmenities(amenities);
        } else {
          const res = await fetch("/api/garages");
          const data = await res.json();
          if (data[0]) {
            setGarage({ ...data[0], images: data[0].images || [] });
            const services = data[0].services ? data[0].services.split(",").map((s: string) => s.trim()) : [];
            const specialties = data[0].specialties ? data[0].specialties.split(",").map((s: string) => s.trim()) : [];
            const certifications = data[0].certifications ? data[0].certifications.split(",").map((s: string) => s.trim()) : [];
            const amenities = data[0].amenities ? data[0].amenities.split(",").map((s: string) => s.trim()) : [];
            setSelectedServices(services);
            setSelectedSpecialties(specialties);
            setSelectedCertifications(certifications);
            setSelectedAmenities(amenities);
            setInitialServices(services);
            setInitialSpecialties(specialties);
            setInitialCertifications(certifications);
            setInitialAmenities(amenities);
          }
        }
      } catch (error) {
        console.error("Error loading garage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!garage) return;
    
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setSaveMessage("Image must be 1MB or smaller.");
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    if ((garage.images || []).length >= MAX_IMAGES) {
      setSaveMessage("You can upload up to 3 images.");
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    setUploading(true);
    setSaveMessage(null);
    
    try {
      const form = new FormData();
      form.append("file", file);
      
      const response = await fetch(`/api/garages/${garage.id}/images`, {
        method: "POST",
        body: form,
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      const updatedGarage = {
        ...garage,
        images: [...(garage.images || []), data],
      };
      
      setGarage(updatedGarage);
      localStorage.setItem("garage-data", JSON.stringify(updatedGarage));
      setSaveMessage("✓ Image uploaded successfully.");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    if (!garage) return;
    
    try {
      const response = await fetch(`/api/garages/${garage.id}/images?imageId=${imageId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete image");
      }
      
      const updatedGarage = {
        ...garage,
        images: (garage.images || []).filter((image) => image.id !== imageId),
      };
      
      setGarage(updatedGarage);
      localStorage.setItem("garage-data", JSON.stringify(updatedGarage));
      setSaveMessage("✓ Image removed.");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Failed to delete image");
    }
  };

  const handleSave = async () => {
    if (!garage) return;
    
    setSaving(true);
    setSaveMessage(null);
    
    try {
      const updateData = {
        services: selectedServices.join(", "),
        specialties: selectedSpecialties.join(", "),
        certifications: selectedCertifications.join(", "),
        amenities: selectedAmenities.join(", "),
      };

      const response = await fetch(`/api/garages/${garage.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      setGarage(data);
      localStorage.setItem("garage-data", JSON.stringify(data));
      setInitialServices(selectedServices);
      setInitialSpecialties(selectedSpecialties);
      setInitialCertifications(selectedCertifications);
      setInitialAmenities(selectedAmenities);
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

  const hasUnsavedChanges =
    JSON.stringify(selectedServices) !== JSON.stringify(initialServices) ||
    JSON.stringify(selectedSpecialties) !== JSON.stringify(initialSpecialties) ||
    JSON.stringify(selectedCertifications) !== JSON.stringify(initialCertifications) ||
    JSON.stringify(selectedAmenities) !== JSON.stringify(initialAmenities);

  const handleDiscard = () => {
    setSelectedServices(initialServices);
    setSelectedSpecialties(initialSpecialties);
    setSelectedCertifications(initialCertifications);
    setSelectedAmenities(initialAmenities);
    setSaveMessage(null);
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Profile & Expertise</h2>
        <p className="text-slate-500 mt-1">Showcase your services, expertise, and facilities</p>
      </div>

      <Card className="p-4 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Gallery Images</h3>
            <p className="text-sm text-slate-500">Upload up to {MAX_IMAGES} images (max {MAX_IMAGE_MB}MB each). These appear on your public garage page.</p>
          </div>
          <label className="flex items-center gap-2 rounded-lg border-2 border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
            <ImagePlus size={18} />
            Add Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleImageUpload(file);
                event.currentTarget.value = "";
              }}
              disabled={uploading || (garage?.images.length ?? 0) >= MAX_IMAGES}
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(garage?.images || []).map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-xl border-2 border-slate-200 aspect-square bg-slate-50">
              <Image
                src={image.url}
                alt={image.alt || garage?.name || "Gallery image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(image.id)}
                className="absolute top-3 right-3 rounded-full bg-red-600 p-2.5 text-white shadow-lg hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {garage && (garage.images || []).length === 0 && (
            <div className="rounded-xl border-2 border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 col-span-3">
              No images uploaded yet. Click "Add Image" to upload your first photo.
            </div>
          )}
        </div>

        {uploading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg">
              <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />
              <span className="font-medium">Uploading...</span>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 lg:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Wrench className="text-emerald-600" size={24} />
          Services Offered
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {COMMON_SERVICES.map((service) => (
            <label
              key={service}
              className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedServices([...selectedServices, service]);
                  } else {
                    setSelectedServices(selectedServices.filter(s => s !== service));
                  }
                }}
                className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700">{service}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-amber-600" size={24} />
          Specialties
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {COMMON_SPECIALTIES.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSpecialties([...selectedSpecialties, specialty]);
                  } else {
                    setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                  }
                }}
                className="w-5 h-5 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700">{specialty}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Award className="text-blue-600" size={24} />
          Certifications & Accreditations
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {COMMON_CERTIFICATIONS.map((cert) => (
            <label
              key={cert}
              className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCertifications.includes(cert)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCertifications([...selectedCertifications, cert]);
                  } else {
                    setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
                  }
                }}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700">{cert}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Coffee className="text-purple-600" size={24} />
          Customer Amenities
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {COMMON_AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAmenities([...selectedAmenities, amenity]);
                  } else {
                    setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                  }
                }}
                className="w-5 h-5 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700">{amenity}</span>
            </label>
          ))}
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
