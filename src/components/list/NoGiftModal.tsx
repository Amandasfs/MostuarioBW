import React, { useState } from "react";

interface NoGiftModalProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>; // agora retorna uma Promise
  onClose: () => void;
}

const NoGiftModal: React.FC<NoGiftModalProps> = ({ isOpen, onConfirm, onClose }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 max-w-md w-full border border-gray-200">
        <h3 className="text-xl font-light text-gray-900 mb-4 text-center">Não Presentear</h3>
        <p className="text-gray-600 mb-3 text-center">
          Tem certeza que não deseja nos presentear?
        </p>
        <p className="text-xs text-gray-500 mb-6 text-center">
          ⚠️ Esta é uma escolha definitiva. Não será possível selecionar um presente posteriormente.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            Voltar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registrando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoGiftModal;
