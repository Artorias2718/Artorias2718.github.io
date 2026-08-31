import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [mkcert(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "..", "..", "attached_assets"),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "mui-core": ["@mui/material", "@emotion/react", "@emotion/styled"],
          "mui-x": ["@mui/x-data-grid"],
          "mui-icons": ["@mui/icons-material"],
          "query": ["@tanstack/react-query"]
        }
      }
    }
  }
})
