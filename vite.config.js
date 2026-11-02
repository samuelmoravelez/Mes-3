import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * GitHub Pages publica el sitio en un subdirectorio con el nombre del
 * repositorio: https://<usuario>.github.io/90-dias-infinitos/
 *
 * - En `npm run dev` servimos desde la raíz ("/").
 * - En `npm run build` usamos el subdirectorio del repositorio.
 *
 * Si publicas en un dominio propio o en un repositorio con otro nombre,
 * cambia solo esta constante.
 */
const REPO_NAME = '90-dias-infinitos'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
}))
