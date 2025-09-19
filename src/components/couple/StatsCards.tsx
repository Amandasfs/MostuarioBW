import React from "react";
import type { Gift } from "./GiftCard";

// 🔹 Tipo Guest local
export interface Guest {
  id: number;
  name: string;
  email: string;
  isattending: boolean;
}

interface StatsCardsProps {
  guests: Guest[];
  gifts: Gift[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ guests, gifts }) => {
  const confirmedGuests = guests.filter((g) => g.isattending).length;
  const totalGuests = guests.length;
  const reservedGifts = gifts.filter((gift) => gift.reserved).length;
  const totalGifts = gifts.length;

  return (
    <div className="bg-gray-50 py-8 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Convidados */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Confirmados
            </h3>
            <p className="text-3xl font-light text-gray-900 mb-2">
              {confirmedGuests} / {totalGuests}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gray-800 h-2.5 rounded-full"
                style={{
                  width: `${
                    totalGuests > 0
                      ? Math.round((confirmedGuests / totalGuests) * 100)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {totalGuests > 0
                ? Math.round((confirmedGuests / totalGuests) * 100)
                : 0}
              % de confirmações
            </p>
          </div>

          {/* Presentes */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Presentes Reservados
            </h3>
            <p className="text-3xl font-light text-gray-900 mb-2">
              {reservedGifts} / {totalGifts}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gray-800 h-2.5 rounded-full"
                style={{
                  width: `${
                    totalGifts > 0
                      ? Math.round((reservedGifts / totalGifts) * 100)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {totalGifts > 0
                ? Math.round((reservedGifts / totalGifts) * 100)
                : 0}
              % da lista
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
