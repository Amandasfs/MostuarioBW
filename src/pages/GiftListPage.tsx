// GiftListPage.tsx
import React, { useState, useEffect } from "react";
import fotoCapa from "../assets/img/foto2.jpeg";
import ReserveModal from "../components/list/ReserveModal";
import NoGiftModal from "../components/list/NoGiftModal";
import type { Gift } from "../pages/CouplePage";

// Tipos simplificados
interface Guest {
  id: number;
  name: string;
  isattending: boolean;
  nogift: boolean;
}

const GiftListPage: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showNoGiftModal, setShowNoGiftModal] = useState(false);
  const [userHasGift, setUserHasGift] = useState(false);

  // Inicializar dados fake
  useEffect(() => {
    const storedGuest = localStorage.getItem("guestData");
    const guestData: Guest = storedGuest
      ? JSON.parse(storedGuest)
      : {
          id: 1,
          name: "Convidado Demo",
          isattending: true,
          nogift: false,
        };

    localStorage.setItem("guestData", JSON.stringify(guestData));
    setGuest(guestData);

    const fakeGifts: Gift[] = [
      {
        id: 1,
        name: "Jogo de Panelas Premium",
        description: "Conjunto de panelas antiaderentes de alta qualidade para o novo lar.",
        price: 450,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/panelas-premium",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 2,
        name: "Aspirador Robô Inteligente",
        description: "Aspirador robô com mapeamento inteligente e controle por aplicativo.",
        price: 1200,
        image: "https://m.magazineluiza.com.br/a-static/420x420/robo-aspirador-electrolux-erb10-19v/magazineluiza/234706600/62c111d7ce6edd1ce49859c5dd290a3e.jpg",
        link: "https://example.com/aspirador-robo",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 3,
        name: "Jogo de Taças de Cristal",
        description: "Conjunto de 8 taças de cristal para brindar momentos especiais.",
        price: 280,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/tacas-cristal",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 4,
        name: "Máquina de Café Expresso",
        description: "Máquina de café automática com moedor integrado e preparo de cappuccino.",
        price: 850,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/maquina-cafe",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 5,
        name: "Jogo de Cama King Size",
        description: "Jogo de cama de algodão egípcio 600 fios, tamanho king size.",
        price: 620,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/jogo-cama",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 6,
        name: "Air Fryer Multifuncional",
        description: "Air fryer com capacidade para 5.5L e 7 funções de preparo.",
        price: 480,
        image: "https://www.bing.com/th?id=OPHS.BLYSqOn9sQ372A474C474&o=5&pid=21.1&w=128&h=128&qlt=100&dpr=1&o=2&bw=6&bc=FFFFFF",
        link: "https://example.com/air-fryer",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 7,
        name: "Jogo de Facas Profissional",
        description: "Conjunto com 8 facas de aço inoxidável e suporte de madeira.",
        price: 380,
        image: "https://www.bing.com/th?id=OPHS.NQ%2b42lgh1x233g474C474&o=5&pid=21.1&w=128&h=188&qlt=100&dpr=1&o=2&bw=6&bc=FFFFFF",
        link: "https://example.com/facas-profissionais",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 8,
        name: "Smart TV 55'' 4K",
        description: "Smart TV LED 55 polegadas com resolução 4K e sistema Android TV.",
        price: 2800,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/smart-tv",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 9,
        name: "Jantar Romântico",
        description: "Vale-presente para jantar romântico em restaurante selecionado.",
        price: 400,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/jantar-romantico",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 10,
        name: "Liquidificador Potente",
        description: "Liquidificador com motor de 1200W e jarra de vidro resistente.",
        price: 320,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/liquidificador",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 11,
        name: "Robô de Cozinha Multifuncional",
        description: "Robô de cozinha com múltiplas funções: mistura, amassa, pica e emulsiona.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/robo-cozinha",
        reserved: false,
        reservedbyguestid: null,
      },
      {
        id: 12,
        name: "Frigobar Elegance",
        description: "Frigobar compacto com design elegante e consumo eficiente de energia.",
        price: 890,
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        link: "https://example.com/frigobar",
        reserved: false,
        reservedbyguestid: null,
      }
    ];

    setGifts(fakeGifts);

    const hasGift =
      guestData.nogift ||
      fakeGifts.some((g) => g.reservedbyguestid === guestData.id);
    setUserHasGift(hasGift);
  }, []);

  // Abrir modal de reserva
  const handleReserveClick = (gift: Gift) => {
    if (userHasGift) return alert("Você já selecionou um presente.");
    setSelectedGift(gift);
    setShowReserveModal(true);
  };

  // Confirmar reserva (fake)
  const confirmReservation = async () => {
    if (!selectedGift || !guest) return;

    const updatedGift = {
      ...selectedGift,
      reserved: true,
      reservedbyguestid: guest.id,
    };

    setGifts((prev) =>
      prev.map((g) => (g.id === updatedGift.id ? updatedGift : g))
    );
    setUserHasGift(true);
    setShowReserveModal(false);
    setSelectedGift(null);

    alert("Presente reservado com sucesso!");
  };

  // Confirmar "não presentear" (fake)
  const confirmNoGift = async () => {
    if (!guest) return;

    const updatedGuest = { ...guest, nogift: true };
    setGuest(updatedGuest);
    setUserHasGift(true);
    setShowNoGiftModal(false);

    localStorage.setItem("guestData", JSON.stringify(updatedGuest));
    alert("Opção 'não presentear' registrada com sucesso!");
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen bg-white font-light">
      {/* Cabeçalho */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={fotoCapa}
          alt="Vinicius e Luana"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide">
              VINICIUS & LUANA
            </h1>
            <div className="w-16 sm:w-20 h-0.5 bg-white mx-auto mb-4 sm:mb-6"></div>
            <p className="text-white text-sm sm:text-base md:text-lg font-light">05 DE DEZEMBRO DE 2025</p>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            SE QUISER, NOS PRESENTEIE
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gray-300 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
            Sua presença em nosso casamento já é o maior presente que
            poderíamos receber. Caso deseje nos presentear, selecionamos algumas
            sugestões.
          </p>

          {userHasGift ? (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-100 border border-gray-300 max-w-md mx-auto">
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                ✅ Você já selecionou um presente ou optou por não presentear.
              </p>
            </div>
          ) : (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 border border-gray-300 max-w-md mx-auto">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                ⚠️ Cada convidado pode selecionar apenas um presente.
              </p>
              <button
                onClick={() => setShowNoGiftModal(true)}
                disabled={userHasGift}
                className="mt-3 py-2 px-4 bg-gray-900 text-white hover:bg-gray-800 text-xs sm:text-sm transition-colors duration-300"
              >
                Optar por não presentear
              </button>
            </div>
          )}
        </div>

        {/* Lista de presentes */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {gifts.map((gift) => {
            const isUserGift = gift.reservedbyguestid === guest?.id;

            return (
              <div
                key={gift.id}
                className={`bg-white border border-gray-200 overflow-hidden transition-all duration-500 ${
                  isUserGift
                    ? "ring-2 ring-black"
                    : gift.reserved
                    ? "opacity-60"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {gift.reserved && (
                    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                      <span className="text-white text-sm sm:text-base font-medium">
                        {isUserGift ? "SEU PRESENTE" : "RESERVADO"}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <div className="bg-white px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-gray-900 border border-gray-200">
                      {formatPrice(gift.price)}
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-1 sm:mb-2 tracking-wide line-clamp-1">
                    {gift.name}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {gift.description}
                  </p>
                  <div className="flex flex-col space-y-2 sm:space-y-3">
                    <a
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-gray-900 border border-gray-300 py-1 sm:py-2 px-2 sm:px-4 hover:bg-gray-50 transition-colors duration-300 text-xs sm:text-sm"
                    >
                      Ver Detalhes
                    </a>
                    <button
                      onClick={() => handleReserveClick(gift)}
                      disabled={gift.reserved || userHasGift}
                      className={`py-1 sm:py-2 px-2 sm:px-4 font-medium transition-all duration-300 text-xs sm:text-sm ${
                        isUserGift
                          ? "bg-black text-white cursor-default"
                          : gift.reserved
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {isUserGift
                        ? "Presente Selecionado"
                        : gift.reserved
                        ? "Indisponível"
                        : "Selecionar Presente"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modais */}
      <ReserveModal
        gift={selectedGift}
        isOpen={showReserveModal}
        onConfirm={confirmReservation}
        onCancel={() => setShowReserveModal(false)}
      />
      <NoGiftModal
        isOpen={showNoGiftModal}
        onConfirm={confirmNoGift}
        onClose={() => setShowNoGiftModal(false)}
      />
    </div>
  );
};

export default GiftListPage;