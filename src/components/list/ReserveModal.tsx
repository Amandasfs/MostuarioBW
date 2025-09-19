import React, { useState } from "react";

// 🔹 Tipo local simplificado
export interface Gift {
  id: number;
  name: string;
  description?: string;
  image?: string;
  link?: string;
  price?: number;
  reserved: boolean;
  reservedbyguestid?: number | null;
}

interface ReserveModalProps {
  gift: Gift | null;
  isOpen: boolean;
  onConfirm: () => void; // agora é síncrono
  onCancel: () => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({ gift, isOpen, onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !gift) return null;

  const handleConfirm = () => {
    setLoading(true);
    try {
      onConfirm(); // chama a função de front
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 max-w-md w-full border border-gray-200 rounded-md">
        <h3 className="text-xl font-light text-gray-900 mb-4 text-center">Confirmar Reserva</h3>
        <p className="text-gray-600 mb-3 text-center">
          Deseja reservar <strong>"{gift.name}"</strong>?
        </p>
        <p className="text-xs text-gray-500 mb-6 text-center">
          ⚠️ Cada convidado pode selecionar apenas um item. Após a confirmação, não será possível alterar.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm rounded-md ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Reservando..." : "Confirmar Escolha"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;
