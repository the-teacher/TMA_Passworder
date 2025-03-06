import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { FRONTEND_PORT, ALLOWED_HOSTS } from "./src/config/env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: FRONTEND_PORT,
    strictPort: true,
    watch: {
      usePolling: true
    },
    allowedHosts: ALLOWED_HOSTS
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
      },
      {
        find: "@test",
        replacement: path.resolve(__dirname, "test")
      },
      {
        find: "@routes",
        replacement: path.resolve(__dirname, "src/routes")
      },
      {
        find: "@ui-kit",
        replacement: path.resolve(__dirname, "src/ui-kit")
      },
      {
        find: "@mocks",
        replacement: path.resolve(__dirname, "src/mocks")
      },
      {
        find: "@story",
        replacement: path.resolve(__dirname, ".storybook")
      },
      {
        find: "@lib",
        replacement: path.resolve(__dirname, "src/lib")
      },
      {
        find: "@i18n",
        replacement: path.resolve(__dirname, "src/i18n")
      }
    ]
  }
});
