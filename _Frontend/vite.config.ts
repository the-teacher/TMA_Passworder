import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const FRONTEND_PORT = parseInt(process.env.VITE_FRONTEND_PORT || "4000", 10);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: FRONTEND_PORT,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: [
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages")
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      }
    ]
  }
});
