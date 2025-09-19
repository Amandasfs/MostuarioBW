// CouplePage.tsx
import React, { useState, useEffect } from "react";
import { GiftsTab } from "../components/couple/GiftsTab";
import { GuestsTab } from "../components/couple/GuestsTab";
import { StatsCards } from "../components/couple/StatsCards";
import { AddEditGiftModal } from "../components/couple/AddEditGiftModal";

// 🔹 Tipos locais corrigidos
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

export interface Guest {
  id: number;
  name: string;
  email: string; // necessário para StatsCards
  isattending: boolean;
  created_at: string;
  nogift: boolean;
}

export const CouplePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"gifts" | "guests">("gifts");
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showAddGiftModal, setShowAddGiftModal] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [newGift, setNewGift] = useState<Partial<Gift>>({
    name: "",
    description: "",
    image: "",
    link: "",
    price: 0,
    reserved: false,
  });

  // 🔹 Mock inicial
  useEffect(() => {
    setGifts([
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
        reserved: true,
        reservedbyguestid: 3,
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
    ]);

    setGuests([
      {
        id: 1,
        name: "Maria Silva",
        email: "maria.silva@email.com",
        isattending: true,
        created_at: "2025-09-15",
        nogift: false,
      },
      {
        id: 2,
        name: "João Santos",
        email: "joao.santos@email.com",
        isattending: false,
        created_at: "2025-09-10",
        nogift: true,
      },
      {
        id: 3,
        name: "Ana Oliveira",
        email: "ana.oliveira@email.com",
        isattending: true,
        created_at: "2025-09-12",
        nogift: false,
      },
      {
        id: 4,
        name: "Pedro Costa",
        email: "pedro.costa@email.com",
        isattending: true,
        created_at: "2025-09-08",
        nogift: false,
      },
      {
        id: 5,
        name: "Carla Rodrigues",
        email: "carla.rodrigues@email.com",
        isattending: false,
        created_at: "2025-09-05",
        nogift: true,
      },
      {
        id: 6,
        name: "Rafael Almeida",
        email: "rafael.almeida@email.com",
        isattending: true,
        created_at: "2025-09-14",
        nogift: false,
      },
      {
        id: 7,
        name: "Juliana Pereira",
        email: "juliana.pereira@email.com",
        isattending: true,
        created_at: "2025-09-11",
        nogift: false,
      },
      {
        id: 8,
        name: "Marcos Ferreira",
        email: "marcos.ferreira@email.com",
        isattending: false,
        created_at: "2025-09-07",
        nogift: true,
      },
      {
        id: 9,
        name: "Fernanda Lima",
        email: "fernanda.lima@email.com",
        isattending: true,
        created_at: "2025-09-13",
        nogift: false,
      },
      {
        id: 10,
        name: "Bruno Carvalho",
        email: "bruno.carvalho@email.com",
        isattending: true,
        created_at: "2025-09-09",
        nogift: false,
      },
      {
        id: 11,
        name: "Patrícia Souza",
        email: "patricia.souza@email.com",
        isattending: false,
        created_at: "2025-09-06",
        nogift: true,
      },
      {
        id: 12,
        name: "Diego Martins",
        email: "diego.martins@email.com",
        isattending: true,
        created_at: "2025-09-16",
        nogift: false,
      },
    ]);
  }, []);
  
  // 🔹 Adicionar presente
  const handleAddGift = () => {
    const newId = gifts.length > 0 ? Math.max(...gifts.map((g) => g.id)) + 1 : 1;
    const giftToAdd: Gift = {
      id: newId,
      name: newGift.name || "",
      description: newGift.description || "",
      image: newGift.image || "https://via.placeholder.com/300x200",
      link: newGift.link || "#",
      price: newGift.price || 0,
      reserved: false,
      reservedbyguestid: null,
    };

    setGifts([...gifts, giftToAdd]);
    resetGiftForm();
    setShowAddGiftModal(false);
  };

  // 🔹 Editar presente
  const handleEditGift = (gift: Gift) => {
    setEditingGift(gift);
    setNewGift(gift);
    setShowAddGiftModal(true);
  };

  const handleSaveEditGift = () => {
    if (editingGift) {
      setGifts(
        gifts.map((g) =>
          g.id === editingGift.id ? { ...editingGift, ...newGift } : g
        )
      );
      resetGiftForm();
      setShowAddGiftModal(false);
    }
  };

  // 🔹 Excluir presente
  const handleDeleteGift = (giftId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este presente?")) {
      setGifts(gifts.filter((g) => g.id !== giftId));
    }
  };

  // 🔹 Liberar presente
  const handleReleaseGift = (giftId: number) => {
    setGifts(
      gifts.map((g) =>
        g.id === giftId ? { ...g, reserved: false, reservedbyguestid: null } : g
      )
    );
  };

  const handleInputChange = (field: string | number | symbol, value: string | number) => {
    setNewGift((prev) => ({ ...prev, [field]: value }));
  };

  const resetGiftForm = () => {
    setNewGift({
      name: "",
      description: "",
      image: "",
      link: "",
      price: 0,
      reserved: false,
    });
    setEditingGift(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Cabeçalho */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 text-center mb-2">
            Área dos Noivos
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            Gerencie a lista de presentes e confirmações
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 bg-gray-300 mx-auto mt-3 md:mt-4"></div>
        </div>
      </div>

      {/* Abas */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-center space-x-4 sm:space-x-8 md:space-x-12">
            <button
              onClick={() => setActiveTab("gifts")}
              className={`py-3 sm:py-4 md:py-5 px-1 border-b-2 font-medium text-sm sm:text-base md:text-lg transition-all duration-300 ${
                activeTab === "gifts"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400"
              }`}
            >
              Lista de Presentes
            </button>
            <button
              onClick={() => setActiveTab("guests")}
              className={`py-3 sm:py-4 md:py-5 px-1 border-b-2 font-medium text-sm sm:text-base md:text-lg transition-all duration-300 ${
                activeTab === "guests"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400"
              }`}
            >
              Lista de Convidados
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <StatsCards guests={guests} gifts={gifts} />

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12 max-w-7xl">
        {activeTab === "gifts" && (
          <GiftsTab
            gifts={gifts}
            onAddGift={() => setShowAddGiftModal(true)}
            onEditGift={handleEditGift}
            onDeleteGift={handleDeleteGift}
            onReleaseGift={handleReleaseGift}
          />
        )}

        {activeTab === "guests" && <GuestsTab guests={guests} />}
      </div>

      {/* Modal */}
      <AddEditGiftModal
        isOpen={showAddGiftModal}
        editingGift={editingGift}
        newGift={newGift}
        onClose={() => {
          setShowAddGiftModal(false);
          resetGiftForm();
        }}
        onSave={editingGift ? handleSaveEditGift : handleAddGift}
        onInputChange={handleInputChange}
      />

      {/* Rodapé */}
      <footer className="bg-gray-950 text-white py-8 md:py-12 text-center mt-12 md:mt-16">
        <div className="container mx-auto px-4">
          <p className="text-lg sm:text-xl font-light mb-3 md:mb-4">Sistema de Gerenciamento</p>
          <p className="text-gray-400 text-sm sm:text-base">Vinicius & Luana - 05.12.2025</p>
          <div className="w-12 sm:w-16 h-0.5 bg-gray-600 mx-auto mt-4 md:mt-6"></div>
        </div>
      </footer>
    </div>
  );
};

export default CouplePage;