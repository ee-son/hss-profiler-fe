import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: { 
    proxy: { 
      "/api": { 
        target: "http://13.211.238.53:5000", changeOrigin: true, 
      }, 
    }, 
  },
})
