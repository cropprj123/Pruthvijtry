import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    //got rid of the CORS error
    proxy: {
      "/api": {
        target: "https://cropify-deploy.onrender.com",
        changeOrigin: true,
        secure: true, //as http not https
      },
    },
  },
});
// https://cropify-deploy.onrender.com/
