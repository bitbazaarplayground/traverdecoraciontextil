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
          supabase: ["@supabase/supabase-js"],
          swiper: ["swiper", "swiper/react", "swiper/modules"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
