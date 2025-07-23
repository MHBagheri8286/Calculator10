import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/common/components"),
      "@constants": resolve(__dirname, "src/common/constants"),
      "@models": resolve(__dirname, "src/common/models"),
      "@hooks": resolve(__dirname, "src/common/hooks"),
      "@utils": resolve(__dirname, "src/common/utils"),
      "@styles": resolve(__dirname, "src/common/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Remove additionalData - don't auto-inject imports
        silenceDeprecations: ["legacy-js-api"]
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
  preview: {
    port: 4173,
    open: true,
  },
});
