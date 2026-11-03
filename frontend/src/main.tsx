// Belépési pont: nyelvi környezet, útvonalak (kezdőlap, adatvédelem, 404) a közös Layout-ban.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import { Layout } from "./components/layout/Layout.tsx";
import { I18nProvider } from "./i18n/I18nProvider.tsx";
import { Adatvedelem } from "./pages/Adatvedelem.tsx";
import { Kezdolap } from "./pages/Kezdolap.tsx";
import { NotFound } from "./pages/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Kezdolap />} />
            <Route path="adatvedelem" element={<Adatvedelem />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>,
);
