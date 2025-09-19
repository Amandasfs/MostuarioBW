// TokenModal.tsx (front-only)
import React, { useState } from "react";

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenValid: (token: string, isBrideGroom: boolean) => void;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  onTokenValid,
}) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError("");
    if (!token.trim()) {
      setError("Digite um token válido.");
      return;
    }

    // Simula backend
    const isBrideGroom = token.toLowerCase().includes("noivos"); // apenas para demo
    localStorage.setItem("guestToken", token);
    onTokenValid(token, isBrideGroom);
    setToken("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Digite seu código</h2>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Insira o token"
          className="w-full border p-2 rounded-lg mb-3"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};
