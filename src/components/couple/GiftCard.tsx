import React from "react";

// 🔹 Tipo local
export interface Gift {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
  price: number;
  reserved: boolean;
  reservedbyguestid: number | null;
}

interface GiftCardProps {
  gift: Gift;
  onEdit: (gift: Gift) => void;
  onDelete: (id: number) => void;
  onRelease: (id: number) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({
  gift,
  onEdit,
  onDelete,
  onRelease,
}) => {
  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="bg-white rounded-none border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-60 object-cover"
        />
        {gift.reserved && (
          <div className="absolute top-0 left-0 bg-gray-900 text-white px-3 py-2 text-sm font-medium">
            RESERVADO
          </div>
        )}
        <div className="absolute top-0 right-0 bg-white px-3 py-2 text-sm font-medium text-gray-900 border-b border-l border-gray-200">
          {formatPrice(gift.price)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-wide">
          {gift.name}
        </h3>
        <p className="text-gray-600 mb-5 leading-relaxed text-sm">
          {gift.description}
        </p>

        {gift.reserved && gift.reservedbyguestid && (
          <div className="bg-gray-50 p-4 border border-gray-200 mb-5">
            <p className="text-sm text-gray-700 font-medium mb-1">
              Presente Reservado
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(gift)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-300 transition-all duration-300 font-medium"
          >
            Editar
          </button>
          {gift.reserved ? (
            <button
              onClick={() => onRelease(gift.id)}
              className="flex-1 bg-gray-800 text-white py-2 px-3 rounded-md text-sm hover:bg-gray-900 transition-all duration-300 font-medium"
            >
              Liberar
            </button>
          ) : (
            <button
              onClick={() => onDelete(gift.id)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-300 transition-all duration-300 font-medium"
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
