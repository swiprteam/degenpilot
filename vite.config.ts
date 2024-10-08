import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: [
      { find: "@/static", replacement: resolve(__dirname, "./static") },
      { find: "~", replacement: resolve(__dirname, "./src") },
      { find: "@", replacement: resolve(__dirname, "./src") },
    ],
  },
});
