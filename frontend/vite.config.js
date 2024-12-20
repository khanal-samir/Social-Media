/* eslint-disable no-undef */
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://social-media-k5zv.onrender.com", //http://localhost:8000
        changeOrigin: true,
        logLevel: "debug", // This will log the proxy details
      },
    },
  },
});
