import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Se usi moduli ES, nessun bisogno di importare type Node o altro
// Definisci la configurazione con defineConfig per miglior supporto TS

export default defineConfig({
  base: "/studysync/",
  build: {
    outDir: "docs",
  },
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
  ],
});
