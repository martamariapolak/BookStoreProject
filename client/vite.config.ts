import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    pluginChecker({
      typescript: {
        tsconfigPath: "tsconfig.app.json", 
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/events": {
        target: "ws://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  }
});
