import React, { useState } from "react";
import fotoCapa from "../assets/img/fotocapa.png";
import linha from "../assets/img/linha.png";
import { TokenModal } from "../components/home/TokenModal";
import { ConfirmationModal } from "../components/home/ConfirmationModal";
import { ThankYouModal } from "../components/home/ThankYouModal";

interface Props {
  onNavigate: (target: "invitation" | "noivos" | "listaPresentes") => void;
}

const WeddingInvitation: React.FC<Props> = ({ onNavigate }) => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // usuário clica no botão → abre modal de token
  const handleOpenTokenModal = () => {
    setShowTokenModal(true);
  };

  // valida o token digitado (fake)
  const handleTokenValid = (token: string) => {
    if (token === "1234") {
      localStorage.setItem("guestToken", token);
      setShowTokenModal(false);
      setShowConfirmationModal(true);
    } else if (token === "5678") {
      localStorage.setItem("brideGroomToken", token);
      setShowTokenModal(false);
      onNavigate("noivos");
    } else {
      alert("Token inválido. Use 1234 para convidados ou 5678 para noivos.");
    }
  };

  // confirmação fake
  const handleGuestConfirmation = (_guestId: number, isAttending: boolean) => {
    setShowConfirmationModal(false);

    // apenas simulação
    console.log("Confirmação simulada:", isAttending ? "Vai comparecer" : "Não vai comparecer");

    if (isAttending) {
      onNavigate("listaPresentes"); // navega para lista
    } else {
      setShowThankYouModal(true); // abre agradecimento
    }
  };

  return (
    <div className="bg-white min-h-screen m-0 p-0 font-sans relative">
      {/* Cabeçalho com a foto em P&B */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={fotoCapa}
          alt="Foto do convite"
          className="w-full h-full object-cover filter grayscale transition-all duration-700 hover:grayscale-0"
        />

        {/* Onda na base */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,240C320,400,1120,80,1440,240L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* Conteúdo do convite */}
      <div className="bg-white text-center px-6 py-8 md:py-12 lg:py-16">
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-light text-black animate-fade-in">
          VINICIUS
        </h1>

        {/* Linhas decorativas com o E */}
        <div className="flex items-center justify-center my-6 md:my-8 lg:my-10 animate-slide-in">
          <div className="h-0.5 bg-black flex-grow max-w-[100px] md:max-w-[150px]"></div>
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-light text-black mx-4">
            E
          </h2>
          <div className="h-0.5 bg-black flex-grow max-w-[100px] md:max-w-[150px]"></div>
        </div>

        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 md:mb-8 animate-fade-in">
          LUANA
        </h1>

        <div className="my-8 md:my-12 lg:my-16 p-4 md:p-6">
          <p className="mt-4 text-xl md:text-2xl lg:text-3xl font-thin text-black animate-fade-in delay-100">
            NOSSO 'FELIZES PARA SEMPRE' COMEÇA AQUI.
          </p>

          <div className="flex justify-center my-6 md:my-8 animate-bounce-in">
            <img
              src={linha}
              alt="Linha decorativa"
              className="w-64 md:w-80 h-auto object-contain"
            />
          </div>

          <p className="mt-6 text-lg md:text-xl lg:text-2xl font-thin text-black animate-fade-in delay-200">
            05 DE DEZEMBRO ÀS 14:00 HORAS
          </p>

          {/* Seção de Traje */}
          <div className="max-w-md mx-auto my-8 md:my-10 p-6 animate-fade-in delay-250">
            <div className="flex flex-col items-center justify-center">
              <p className="text-black font-medium text-lg uppercase tracking-wide mb-2">
                Traje
              </p>
              <p className="text-black font-light text-lg">ALL BLACK</p>
            </div>
          </div>

          {/* Endereço fake */}
          <div className="max-w-md mx-auto my-8 md:my-10 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm animate-fade-in delay-300">
            <p className="text-black font-medium mb-4 text-lg">LOCAL</p>
            <p className="text-black font-light mb-2">Rua Exemplo, 123</p>
            <p className="text-black font-light mb-2">São Paulo - SP</p>
            <p className="text-black font-light">00000-000</p>
          </div>

          {/* Botão */}
          <div className="mt-10 md:mt-12 animate-fade-in delay-500">
            <button
              onClick={handleOpenTokenModal}
              className="bg-black text-white py-3 px-8 md:py-4 md:px-10 rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Confirmar Presença
            </button>
          </div>
        </div>
      </div>

      {/* Modais (simulação) */}
      <TokenModal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onTokenValid={handleTokenValid}
      />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onSuccess={handleGuestConfirmation}
      />
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />

      {/* Rodapé */}
      <div className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
        <p>Com amor, Vinicius & Luana</p>
      </div>
    </div>
  );
};

export default WeddingInvitation;
