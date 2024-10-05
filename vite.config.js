import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add this line to alias jsmediatags to its dist file
      jsmediatags: "jsmediatags/dist/jsmediatags.min.js",
    },
  },
});
