// ConfirmationModal.tsx (front-only)
import React, { useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (guestId: number, isAttending: boolean) => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [isAttending, setIsAttending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Digite seu nome.");
      return;
    }

    const guestToken = localStorage.getItem("guestToken");
    if (!guestToken) {
      alert("Token de convidado não encontrado. Use qualquer código para simular!");
    }

    setLoading(true);
    setTimeout(() => {
      // Simula resposta do backend
      const guestId = Math.floor(Math.random() * 1000) + 1;

      const guestData = {
        id: guestId,
        name: name.trim(),
        isattending: isAttending,
        created_at: new Date().toISOString(),
        nogift: false,
      };

      localStorage.setItem("guestId", String(guestId));
      localStorage.setItem("guestName", guestData.name);
      localStorage.setItem("guestData", JSON.stringify(guestData));

      onSuccess(guestId, isAttending);
      setName("");
      setIsAttending(true);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in">
        <h3 className="text-xl font-semibold mb-4">Confirmar Presença</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left mb-2">Seu nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-left mb-2">Você comparecerá ao evento?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isAttending}
                  onChange={() => setIsAttending(true)}
                  className="mr-2"
                />
                Sim, estarei presente
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!isAttending}
                  onChange={() => setIsAttending(false)}
                  className="mr-2"
                />
                Não poderei comparecer
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Confirmando..." : "Confirmar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
