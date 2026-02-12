import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ✅ admin-only (once we lazy-load admin, this stays out of homepage)
          supabase: ["@supabase/supabase-js"],

          // ✅ only used when GalleryCarousel loads
          swiper: ["swiper", "swiper/react", "swiper/modules"],
        },
      },
    },
  },
});
