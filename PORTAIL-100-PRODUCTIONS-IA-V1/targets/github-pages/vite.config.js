import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "./",
  build: {
    outDir: fileURLToPath(new URL("../../release/github-pages", import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
});

