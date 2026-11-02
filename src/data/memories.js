/**
 * ============================================================
 *  LAS 6 ESTRELLAS DE LA CONSTELACIÓN  ·  memories.js
 * ============================================================
 *  Los seis recuerdos reales de «Nuestra constelación». Cada estrella
 *  abre una ventana con su fotografía, su título y su texto completo.
 *
 *  Campos de cada recuerdo:
 *   - id:         identificador único (no lo repitas)
 *   - title:      nombre del recuerdo
 *   - date:       'AAAA-MM-DD' o una etiqueta de texto; si es null no se
 *                 muestra la fecha (estos recuerdos no llevan fecha)
 *   - description:el texto completo del recuerdo
 *   - image:      ruta dentro de public/ (o null para mostrar el marco vacío)
 *   - coords:     posición en la constelación en % { x, y }  (0 → 100)
 *   - size:       brillo/tamaño relativo de la estrella (0.8 → 1.4)
 *   - placeholder:true = el contenido seguiría siendo de ejemplo
 *
 *  ⚠️ FOTOGRAFÍAS
 *  Las fotos reales están en `public/images/recuerdos/`:
 *    imagen1.jpg · imagen2.jpg · imagen3.jpg
 *    imagen4.jpg · imagen5.jpg · imagen6.jpg
 *  (el cuarto archivo se llama `imagen4`, con «n»). Cada recuerdo ya apunta
 *  a la suya; si cambias un archivo, actualiza aquí la ruta `image`.
 *
 *  Para cambiar una posición, ajusta x (horizontal) e y (vertical).
 */

export const memories = [
  {
    id: 'recuerdo-01',
    title: 'San Pedro de los Milagros',
    date: null,
    description:
      'Increíble cómo una foto que empezó por molestar terminó encantándome tanto. En ella se plasma perfectamente la forma tan hermosa en la que te veo.',
    image: 'images/recuerdos/imagen1.jpg',
    coords: { x: 30, y: 20 },
    size: 1.05,
    placeholder: false,
  },
  {
    id: 'recuerdo-02',
    title: 'Nuestra primera mascarilla',
    date: null,
    description:
      'Siempre que veo esta foto me siento amado, incluso si no estás a mi lado. Esa forma en la que me miras y nuestra primera mascarilla juntos fueron algo increíble.',
    image: 'images/recuerdos/imagen2.jpg',
    coords: { x: 13, y: 45 },
    size: 0.95,
    placeholder: false,
  },
  {
    id: 'recuerdo-03',
    title: 'En la cama',
    date: null,
    description:
      'Esta foto simplemente me encanta. Muestra cómo nos vemos cuando estamos juntos y que no hace falta mucho para ser felices: solo tú, yo y una cama.',
    image: 'images/recuerdos/imagen3.jpg',
    coords: { x: 50, y: 88 },
    size: 1.25,
    placeholder: false,
  },
  {
    id: 'recuerdo-04',
    title: 'Salida a Comer',
    date: null,
    description:
      'Compartir contigo ese día en Sabaneta fue de las mejores sensaciones. Me demostraste tanto al no abandonar la ruta a pesar de la lluvia.',
    image: 'images/recuerdos/imagen4.jpg',
    coords: { x: 87, y: 45 },
    size: 0.95,
    placeholder: false,
  },
  {
    id: 'recuerdo-05',
    title: 'Baño juntos',
    date: null,
    description:
      'La segunda vez que nos bañamos juntos. Una de las sensaciones más indescriptibles de todas... un detalle pequeño, pero que me encanta.',
    image: 'images/recuerdos/imagen5.jpg',
    coords: { x: 70, y: 20 },
    size: 1.05,
    placeholder: false,
  },
  {
    id: 'recuerdo-06',
    title: 'Partido de mi hermano',
    date: null,
    description:
      'La primera vez que me acompañaste al partido de mi hermano fue increíble. Me hiciste sentir que no solo me quieres a mí, sino también a mi familia.',
    image: 'images/recuerdos/imagen6.jpg',
    coords: { x: 50, y: 36 },
    size: 1.2,
    placeholder: false,
  },
]

/**
 * Líneas finas que conectan las estrellas.
 * Se escriben con los `id` de los recuerdos: [origen, destino].
 * Forman el contorno del corazón al descubrir todas las estrellas.
 */
export const memoryLinks = [
  ['recuerdo-01', 'recuerdo-02'],
  ['recuerdo-02', 'recuerdo-03'],
  ['recuerdo-03', 'recuerdo-04'],
  ['recuerdo-04', 'recuerdo-05'],
  ['recuerdo-05', 'recuerdo-06'],
  ['recuerdo-06', 'recuerdo-01'],
]

export const TOTAL_MEMORIES = memories.length

export default memories
