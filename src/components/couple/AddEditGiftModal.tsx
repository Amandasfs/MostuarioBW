import React from "react";

// 🔹 Tipo local (sem API)
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

interface AddEditGiftModalProps {
  isOpen: boolean;
  editingGift: Gift | null;
  newGift: Partial<Gift>;
  onClose: () => void;
  onSave: () => void;
  onInputChange: (field: keyof Gift, value: string | number) => void;
}

export const AddEditGiftModal: React.FC<AddEditGiftModalProps> = ({
  isOpen,
  editingGift,
  newGift,
  onClose,
  onSave,
  onInputChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div className="bg-white rounded-none border border-gray-300 p-4 sm:p-6 md:p-8 max-w-md w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6 text-center">
          {editingGift ? "Editar Presente" : "Adicionar Presente"}
        </h3>

        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Nome do Presente
            </label>
            <input
              type="text"
              value={newGift.name || ""}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-sm sm:text-base"
              placeholder="Ex: Jogo de Panelas Premium"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Descrição
            </label>
            <textarea
              value={newGift.description || ""}
              onChange={(e) => onInputChange("description", e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-sm sm:text-base"
              rows={2}
              placeholder="Descreva o presente..."
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              URL da Imagem
            </label>
            <input
              type="text"
              value={newGift.image || ""}
              onChange={(e) => onInputChange("image", e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-sm sm:text-base"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Link do Produto
            </label>
            <input
              type="text"
              value={newGift.link || ""}
              onChange={(e) => onInputChange("link", e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-sm sm:text-base"
              placeholder="https://exemplo.com/produto"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={newGift.price || 0}
              onChange={(e) =>
                onInputChange("price", parseFloat(e.target.value) || 0)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-sm sm:text-base"
              placeholder="299.90"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 sm:px-5 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            {editingGift ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
};