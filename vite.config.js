import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { createRequire } from 'module'
import path from 'path'
const { resolve } = createRequire(import.meta.url)

const prismaClient = `prisma${path.sep}client`

const prismaClientIndexBrowser = resolve('@prisma/client/index-browser').replace(`@${prismaClient}`, `.${prismaClient}`)
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [sveltekit()],
  resolve: { alias: { '.prisma/client/index-browser': path.relative(__dirname, prismaClientIndexBrowser) } },
})
// vite.config.ts