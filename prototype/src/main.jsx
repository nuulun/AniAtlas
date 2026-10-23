import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import { AppStateProvider } from "./state.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import TitlePage from "./pages/TitlePage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import MyListsPage from "./pages/MyListsPage.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";
import "./styles.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function App() {
  return (
    <HashRouter>
      <AppStateProvider>
        <ScrollToTop />
        <Header />
        <main className="wrap">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/title/:id" element={<TitlePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/me" element={<MyListsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="*" element={<CatalogPage />} />
          </Routes>
        </main>
      </AppStateProvider>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
