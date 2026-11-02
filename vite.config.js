import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * ============================================================
 *  BASE PARA GITHUB PAGES
 * ============================================================
 *  GitHub Pages publica los repositorios de proyecto en:
 *      https://<usuario>.github.io/<NOMBRE-DEL-REPOSITORIO>/
 *  Por eso TODOS los recursos (JS, CSS, imágenes, música) deben
 *  generarse con ese subdirectorio como prefijo, nunca desde "/".
 *
 *  - `npm run dev`   → base "/"  (servidor local en la raíz).
 *  - `npm run build` → base "/<repositorio>/"
 *  - `npm run preview` sirve el resultado compilado en ese mismo subdirectorio.
 *
 *  El nombre se detecta automáticamente cuando la compilación corre en
 *  GitHub Actions (variable GITHUB_REPOSITORY, p. ej. "usuario/Mes-3").
 *  En local se usa REPO_NAME. Así la ruta publicada nunca queda
 *  desincronizada respecto al repositorio real.
 *
 *  ⚠️ REPO_NAME debe coincidir EXACTAMENTE con el nombre del repositorio
 *     en GitHub. Un desajuste aquí hace que assets/*.js devuelva 404 y la
 *     página quede en negro.
 */
const REPO_NAME = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Mes-3'

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
