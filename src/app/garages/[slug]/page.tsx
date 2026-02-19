import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import ContactForm from "./ContactForm";
import BookingButton from "./BookingButton";
import BookableServices from "./BookableServices";
import ReviewsSection from "./ReviewsSection";
import { MapPin, Phone, Mail, Globe, Clock, Star } from "lucide-react";

const buildDescription = (garage: {
  shortDescription?: string | null;
  description?: string | null;
  name: string;
}) => {
  const text = garage.shortDescription || garage.description;
  return text || `${garage.name} is listed on the Garage Boost directory.`;
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const garage = await prisma.garage.findFirst({
    where: { slug, isPublic: true },
    select: { name: true, shortDescription: true, description: true },
  });

  if (!garage) {
    return { title: "Garage Not Found | Garage Boost" };
  }

  const description = buildDescription(garage);

  return {
    title: `${garage.name} | Garage Boost Directory`,
    description,
    openGraph: {
      title: garage.name,
      description,
      type: "profile",
    },
  };
}

export default async function GaragePublicPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const garage = await prisma.garage.findFirst({
    where: {
      isPublic: true,
      OR: [{ slug }, { id: slug }],
    },
    include: { 
      images: { orderBy: { sortOrder: "asc" } },
      bookableServices: {
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!garage) {
    notFound();
  }

  if (garage.slug && slug !== garage.slug) {
    redirect(`/garages/${garage.slug}`);
  }

  const description = buildDescription(garage);
  const images = garage.images.slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: garage.name,
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: garage.address || undefined,
      addressLocality: garage.city || undefined,
      addressRegion: garage.county || undefined,
      postalCode: garage.postcode || undefined,
      addressCountry: "GB",
    },
    telephone: garage.phone || undefined,
    email: garage.email || undefined,
    url: garage.website || undefined,
  };

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white">
        <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Garage Boost Directory</p>
                <h1 className="text-4xl md:text-5xl font-black mt-3">{garage.name}</h1>
                <p className="text-lg text-blue-100 mt-4 max-w-2xl">{description}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-yellow-300">
                  <Star size={18} fill="currentColor" />
                  <span className="text-sm font-semibold">Verified on Garage Boost</span>
                </div>
                <p className="text-sm text-blue-100 mt-3">Responds fast and accepts direct enquiries.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {images.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {images.map((image) => (
                  <div key={image.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img
                      src={image.url}
                      alt={image.alt || garage.name}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">About {garage.name}</h2>
              <p className="text-slate-600 leading-relaxed">
                {garage.description || garage.shortDescription || "This garage has not added a full description yet."}
              </p>
            </section>

            <BookableServices
              garageId={garage.id}
              garageSlug={garage.slug || garage.id}
              garageName={garage.name}
              services={garage.bookableServices}
            />

            {(garage.services || garage.specialties || garage.certifications || garage.amenities) && (
              <section className="grid gap-6 md:grid-cols-2">
                {garage.services && (
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900">Services Offered</h3>
                    <p className="text-sm text-slate-600 mt-2">{garage.services}</p>
                  </div>
                )}
                {garage.specialties && (
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900">Specialties</h3>
                    <p className="text-sm text-slate-600 mt-2">{garage.specialties}</p>
                  </div>
                )}
                {garage.certifications && (
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900">Certifications</h3>
                    <p className="text-sm text-slate-600 mt-2">{garage.certifications}</p>
                  </div>
                )}
                {garage.amenities && (
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900">Amenities</h3>
                    <p className="text-sm text-slate-600 mt-2">{garage.amenities}</p>
                  </div>
                )}
              </section>
            )}

            <ReviewsSection garageSlug={garage.slug || garage.id} />
          </div>

          <aside className="space-y-6">
            <BookingButton
              garageId={garage.id}
              garageSlug={garage.slug || garage.id}
              garageName={garage.name}
            />

            <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>
              {(garage.address || garage.postcode || garage.city) && (
                <div className="flex gap-3 text-slate-600">
                  <MapPin size={18} className="mt-1" />
                  <div>
                    <p className="font-medium text-slate-900">{garage.address || garage.name}</p>
                    <p className="text-sm">{[garage.city, garage.county, garage.postcode].filter(Boolean).join(", ")}</p>
                  </div>
                </div>
              )}
              {garage.phone && (
                <div className="flex gap-3 text-slate-600">
                  <Phone size={18} className="mt-1" />
                  <a className="text-blue-600 hover:text-blue-700" href={`tel:${garage.phone}`}>
                    {garage.phone}
                  </a>
                </div>
              )}
              {garage.email && (
                <div className="flex gap-3 text-slate-600">
                  <Mail size={18} className="mt-1" />
                  <a className="text-blue-600 hover:text-blue-700" href={`mailto:${garage.email}`}>
                    {garage.email}
                  </a>
                </div>
              )}
              {garage.website && (
                <div className="flex gap-3 text-slate-600">
                  <Globe size={18} className="mt-1" />
                  <a
                    className="text-blue-600 hover:text-blue-700"
                    href={garage.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {garage.website}
                  </a>
                </div>
              )}
              {garage.openingHours && (
                <div className="flex gap-3 text-slate-600">
                  <Clock size={18} className="mt-1" />
                  <p className="text-sm whitespace-pre-line">{garage.openingHours}</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Send an enquiry</h3>
              <ContactForm slug={slug} />
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
}
