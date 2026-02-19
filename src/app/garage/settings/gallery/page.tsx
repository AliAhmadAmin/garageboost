"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { ImagePlus, Trash2 } from "lucide-react";
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
  images: GarageImage[];
}

export default function GallerySettings() {
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const current = JSON.parse(cached);
          setGarage({ ...current, images: current.images || [] });
        } else {
          const res = await fetch("/api/garages");
          const data = await res.json();
          if (data[0]) {
            setGarage({ ...data[0], images: data[0].images || [] });
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
        credentials: "include",
        body: form,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      const updatedGarage = { ...garage, images: [...(garage.images || []), data] };
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
        credentials: "include",
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete image");
      }
      const updatedGarage = { ...garage, images: (garage.images || []).filter((image) => image.id !== imageId) };
      setGarage(updatedGarage);
      localStorage.setItem("garage-data", JSON.stringify(updatedGarage));
      setSaveMessage("✓ Image removed.");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Failed to delete image");
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Gallery</h2>
        <p className="text-slate-500 mt-1">Showcase your garage with photos</p>
      </div>

      <Card className="p-8">
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

      {saveMessage && (
        <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
          saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {saveMessage}
        </div>
      )}
    </div>
  );
}
