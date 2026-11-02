/**
 * Resuelve la ruta real de un recurso que vive en la carpeta `public/`.
 *
 * En GitHub Pages el sitio se publica dentro de un subdirectorio
 * (ej. /90-dias-infinitos/), por lo que NUNCA debemos escribir rutas
 * absolutas tipo "/images/foto.jpg": se romperían al desplegar.
 *
 * Uso:
 *   <img src={asset('images/recuerdos/recuerdo-01.svg')} />
 */
const BASE = import.meta.env.BASE_URL || '/'

export function asset(path = '') {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return `${BASE}${String(path).replace(/^\.?\//, '')}`
}

export default asset
