import React, { useState, useEffect } from "react";
import WeddingInvitation from "./pages/WeddingInvitation";
import CouplePage from "./pages/CouplePage";
import ListaPresentes from "./pages/GiftListPage";

const App: React.FC = () => {
  const [page, setPage] = useState<"invitation" | "noivos" | "listaPresentes">("invitation");

  // Base do GitHub Pages
  const base = "/MostuarioBW";

  // Atualiza a página baseado na URL ao carregar
  useEffect(() => {
    let path = window.location.pathname;

    // remove o prefixo do GitHub Pages
    if (path.startsWith(base)) {
      path = path.replace(base, "");
    }

    if (path === "/noivos") setPage("noivos");
    else if (path === "/lista-presentes") setPage("listaPresentes");
    else setPage("invitation");
  }, []);

  const navigate = (target: "invitation" | "noivos" | "listaPresentes") => {
    setPage(target);
    window.history.pushState(
      null,
      "",
      target === "invitation" ? `${base}/` : `${base}/${target}`
    );
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
