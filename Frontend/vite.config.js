import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/apple-touch-icon.png"],
      devOptions: { enabled: true },
      manifest: {
        name: "MAYA - My AI, Your Assistant",
        short_name: "MAYA",
        description: "Personal Intelligent AI Assistant by Sonu Kumar",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#0b0b14",
        theme_color: "#7c3aed",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
      workbox: { navigateFallback: "/index.html", globPatterns: ["**/*.{js,css,html,svg,png}"] },
    }),
  ],
});