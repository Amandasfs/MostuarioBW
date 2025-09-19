import React from 'react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center animate-fade-in">
        <h3 className="text-xl font-semibold mb-4">Obrigado pela confirmação!</h3>
        <p className="mb-6">Sua resposta foi registrada. Sentiremos sua falta!</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};