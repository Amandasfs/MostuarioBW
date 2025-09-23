import React, { useState, useEffect } from "react";
import WeddingInvitation from "./pages/WeddingInvitation";
import CouplePage from "./pages/CouplePage";
import ListaPresentes from "./pages/GiftListPage";

const App: React.FC = () => {
  const [page, setPage] = useState<"invitation" | "noivos" | "listaPresentes">("invitation");

  // Atualiza a página baseado na URL ao carregar
  useEffect(() => {
    const path = window.location.pathname.replace("/MostuarioBW", "");
    if (path === "/noivos") setPage("noivos");
    else if (path === "/lista-presentes") setPage("listaPresentes");
    else setPage("invitation");
  }, []);

  const navigate = (target: "invitation" | "noivos" | "listaPresentes") => {
    setPage(target);
    const base = "/MostuarioBW";
    window.history.pushState(null, "", target === "invitation" ? base + "/" : `${base}/${target}`);
  };


  return (
    <>
      {page === "invitation" && <WeddingInvitation onNavigate={navigate} />}
      {page === "noivos" && <CouplePage />}
      {page === "listaPresentes" && <ListaPresentes />}
    </>
  );
};

export default App;
