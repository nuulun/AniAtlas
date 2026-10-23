import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` produces one self-contained dist/index.html (used for the online prototype)
export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
