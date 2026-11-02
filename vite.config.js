import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * GitHub Pages publica el sitio en un subdirectorio con el nombre del
 * repositorio: https://<usuario>.github.io/90-dias-infinitos/
 *
 * - En `npm run dev` servimos desde la raíz ("/").
 * - En `npm run build` y en `npm run preview` usamos el subdirectorio
 *   del repositorio (ambos corren en modo "production").
 *
 * Usamos `mode` y no `command` a propósito: `vite preview` también se
 * ejecuta con el comando "serve", pero en modo "production". Si usáramos
 * `command === 'build'`, la vista previa serviría en "/" y los recursos
 * compilados apuntarían a "/90-dias-infinitos/...", rompiendo la página.
 *
 * Si publicas en un dominio propio o en un repositorio con otro nombre,
 * cambia solo esta constante.
 */
const REPO_NAME = '90-dias-infinitos'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
}))
