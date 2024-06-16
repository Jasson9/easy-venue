import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [sveltekit()],
  resolve: {
    alias: {
      ".prisma/client/index-browser": "/node_modules/.prisma/client/index-browser.js"
    }
  }
})
