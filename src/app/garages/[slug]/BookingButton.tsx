"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { Calendar } from "lucide-react";

interface BookingButtonProps {
  garageId: string;
  garageSlug: string;
  garageName: string;
}

export default function BookingButton({
  garageId,
  garageSlug,
  garageName,
}: BookingButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Calendar size={20} />
        Book Online
      </button>

      {showModal && (
        <BookingModal
          garageId={garageId}
          garageSlug={garageSlug}
          garageName={garageName}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
