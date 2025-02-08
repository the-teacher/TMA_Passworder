import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const FRONTEND_PORT = parseInt(process.env.VITE_FRONTEND_PORT || "4000", 10);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: FRONTEND_PORT,
  },
});
