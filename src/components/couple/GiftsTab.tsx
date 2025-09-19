import React from "react";
import { GiftCard } from "./GiftCard";
import type { Gift } from "./GiftCard";

interface GiftsTabProps {
  gifts: Gift[];
  onAddGift: () => void;
  onEditGift: (gift: Gift) => void;
  onDeleteGift: (id: number) => void;
  onReleaseGift: (id: number) => void;
}

export const GiftsTab: React.FC<GiftsTabProps> = ({
  gifts,
  onAddGift,
  onEditGift,
  onDeleteGift,
  onReleaseGift,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-light text-gray-900">Lista de Presentes</h2>
        <button
          onClick={onAddGift}
          className="bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-all duration-300 font-medium"
        >
          Adicionar Presente
        </button>
      </div>

      {gifts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">
            Nenhum presente cadastrado ainda.
          </p>
          <button
            onClick={onAddGift}
            className="mt-4 bg-gray-900 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
          >
            Adicionar Primeiro Presente
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onEdit={onEditGift}
              onDelete={onDeleteGift}
              onRelease={onReleaseGift}
            />
          ))}
        </div>
      )}
    </div>
  );
};
