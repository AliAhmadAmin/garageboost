"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { Badge } from "@/components/ui/Badge";
import { Clock, Calendar } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  durationMinutes: number;
  pricePence: number;
  depositRequired: boolean;
  depositPence: number;
}

interface BookableServicesProps {
  garageId: string;
  garageSlug: string;
  garageName: string;
  services: Service[];
}

export default function BookableServices({
  garageId,
  garageSlug,
  garageName,
  services,
}: BookableServicesProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const formatPrice = (pence: number) => `£${(pence / 100).toFixed(2)}`;

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  if (services.length === 0) {
    return null;
  }

  return (
    <>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bookable Services</h2>
          <p className="text-slate-600 mt-1">Choose a service and book your appointment online</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                    <Badge variant={service.category === "MOT" ? "blue" : "default"}>
                      {service.category}
                    </Badge>
                  </div>
                  {service.description && (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} />
                    <span>{service.durationMinutes} min</span>
                  </div>
                  {service.depositRequired && (
                    <p className="text-xs text-amber-600">
                      Deposit: {formatPrice(service.depositPence)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(service.pricePence)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookService(service)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Calendar size={18} />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <BookingModal
          garageId={garageId}
          garageSlug={garageSlug}
          garageName={garageName}
          initialService={selectedService}
          onClose={() => {
            setShowModal(false);
            setSelectedService(null);
          }}
        />
      )}
    </>
  );
}
