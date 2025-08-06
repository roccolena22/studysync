import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/studysync/",

  build: {
    outDir: "docs",
    emptyOutDir: true,
  },

  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    tailwindcss()
  ],
});
