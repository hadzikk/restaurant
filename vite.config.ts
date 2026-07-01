import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@libs": path.resolve(__dirname, "./src/shared/libs"),
      "@auth": path.resolve(__dirname, "./src/modules/auth"),
      "@menu": path.resolve(__dirname, "./src/modules/menu"),
      "@customer": path.resolve(__dirname, "./src/modules/customer"),
      "@staff": path.resolve(__dirname, "./src/modules/staff"),
    },
  },
})
