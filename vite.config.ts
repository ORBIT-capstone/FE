import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // 새 버전 배포 시 자동 업데이트
      registerType: "autoUpdate",
      includeAssets: [
        "favicons/favicon.ico",
        "favicons/apple-touch-icon.png",
        "favicons/favicon-96x96.png",
        "favicons/favicon.svg",
        "favicons/site.webmanifest",
        "favicons/web-app-manifest-192x192.png",
        "favicons/web-app-manifest-512x512.png",
      ],
      // 직접 생성한 site.webmanifest 사용
      manifest: false,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  server: {
    open: true,
  },

  // 다른 프로젝트 서비스 워커와 포트 충돌 방지
  preview: {
    port: 4180,
  },
});
