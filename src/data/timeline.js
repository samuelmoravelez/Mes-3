/**
 * ============================================================
 *  LÍNEA DE TIEMPO  ·  timeline.js
 * ============================================================
 *  Los seis capítulos de nuestra historia, con los textos definitivos.
 *
 *  Campos:
 *   - id, title, description, image, icon
 *   - date: 'AAAA-MM-DD' o una etiqueta de texto escrita a mano
 *           (ej. "Antes del 1 de agosto de 2026", "Primeras semanas juntos").
 *           Las etiquetas se muestran tal cual, sin convertirlas en fecha.
 *
 *  Iconos disponibles: 'book' | 'cart' | 'coffee' | 'sparkles' | 'heart' | 'calendar'
 */

export const timelineEvents = [
  {
    id: 'tl-comienzo',
    date: '2026-08-01',
    title: 'El inicio de nuestro camino',
    description:
      'El 1 de agosto de 2026 arrancó formalmente la cuenta de estos 90 días. Este fue el punto de partida de todo lo bonito que hemos construido, el primer día de un viaje a tu lado que le dio un giro completo a mi vida.',
    icon: 'calendar',
    image: null,
  },
  {
    id: 'tl-clase-ingles',
    date: 'Antes del 1 de agosto de 2026',
    title: 'La valentía que lo cambió todo',
    description:
      'Llevaba tiempo preguntando por tu Instagram a tus amigas de inglés y ninguna lo tenía. Me moría de nervios y de miedo de acercarme a hablarte directamente por temor al rechazo. Pero el último día de clase, pasé por tu salón, me hiciste señas para que te esperara y me dijiste que te causaba mucha curiosidad ver cómo le preguntaba a todo el mundo por ti pero no me acercaba. Tu valentía ese día rompió todos mis miedos y dio el primer paso a esto tan hermoso.',
    icon: 'book',
    image: null,
  },
  {
    id: 'tl-exito',
    date: 'Momentos previos al inicio',
    title: 'El día que lo entendí todo',
    description:
      'Caminamos por todo el Éxito sin afán y luego nos sentamos a hablar. En ese momento me hiciste entender que el hombre con el que querías estar era yo, diciéndome que si tú tenías todo para estar conmigo, por qué yo no. Esa forma en la que no me dejaste ir me hizo sentir por primera vez lo que es el amor verdadero; ese día me quedó claro que tú eras mi todo.',
    icon: 'cart',
    image: null,
  },
  {
    id: 'tl-primeras-salidas',
    date: 'Primeras semanas juntos',
    title: 'Sin pena de amar al mundo',
    description:
      'Nuestras salidas a San Pedro de los Milagros y al CC Florida se me quedaron grabadas en el alma. Ver cómo me cogías de la mano y me dabas picos por todos lados sin ninguna pena, junto a la forma tan única en la que me mirabas, me demostró la entrega y el cariño tan bonito que tenías para darme.',
    icon: 'coffee',
    image: null,
  },
  {
    id: 'tl-momentos-especiales',
    date: 'A lo largo de estos meses',
    title: 'Detallitos que se quedan en el alma',
    description:
      'Son esos instantes cotidianos los que me hacen volver a enamorarme: cuando me mimas, cuando me abrazas o cuando me das un beso de esos que me hacen sentir en otro planeta. Jamás olvidaré esa mirada cruzada en el carro cuando sonó «Perro enamorado» de Yeison Jiménez; esa conexión entre los dos fue de otro nivel.',
    icon: 'sparkles',
    image: null,
  },
  {
    id: 'tl-90-dias',
    date: '2026-10-30',
    title: 'Noventa días a tu lado',
    description:
      'Llegamos a los 90 días. Tres meses exactos desde aquel 1 de agosto en los que he vivido los momentos más felices de mi vida. Gracias por enseñarme a creer en el amor, por ser mi refugio y por demostrarme día a día la mujer tan increíble que eres. Esto apenas empieza.',
    icon: 'heart',
    image: null,
  },
]

export default timelineEvents
