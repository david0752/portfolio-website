// Vite beállítás: React + Tailwind 4. Fejlesztéskor az /api kéréseket a backend kapja (:3300).
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const backendProxy = { "/api": { target: "http://localhost:3300", changeOrigin: true } };

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: { proxy: backendProxy },
  preview: { proxy: backendProxy },
});
