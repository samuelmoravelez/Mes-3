# 90 días, infinitos recuerdos

Experiencia web cinematográfica y romántica creada para **«Mi niña»**.
Cinco escenas —bienvenida, línea de tiempo, constelación, carta y final— con
contador de días en vivo, música de fondo persistente y animaciones suaves.

> **Nota:** los textos, fechas, fotografías y la canción son los definitivos
> del proyecto. Si quieres ajustar algo, todo el contenido editable está
> centralizado en `src/data/` (ver sección 4).

---

## 1. Tecnologías

- **React 18** + **Vite 5** (JavaScript, sin TypeScript)
- **Tailwind CSS 3** (tema y paleta personalizados)
- **Framer Motion** (transiciones y microanimaciones)
- **Lucide React** (iconografía)
- Sin Firebase ni base de datos: todo el contenido vive en archivos JS locales.

---

## 2. Requisitos

- Node.js **18** o superior
- npm **9** o superior

---

## 3. Instalación y uso local

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev
# → abre http://localhost:5173

# 3. Compilar para producción (genera la carpeta dist/)
npm run build

# 4. Previsualizar la compilación de producción
npm run preview
```

---

## 4. Personalización (qué reemplazar)

Todos los textos están centralizados para que no tengas que tocar los
componentes.

### 4.1. Nombre, título y fecha — [`src/data/site.js`](src/data/site.js)

| Campo | Qué es | Valor actual |
| --- | --- | --- |
| `herName` | Apodo que aparece en la experiencia | `'Mi niña'` |
| `title` | Título del proyecto | `'90 días, infinitos recuerdos'` |
| `startDate` | Fecha en que empezó todo (`AAAA-MM-DDTHH:mm:ss`, hora local) | `'2026-08-01T00:00:00'` |
| `milestoneDays` | Días del hito | `90` |

> Con `startDate = 2026-08-01` el hito de **90 días se cumple el 30 de octubre
> de 2026**. El contador lo calcula en vivo; no está escrito a mano.

### 4.2. Recuerdos de la constelación — [`src/data/memories.js`](src/data/memories.js)

Array `memories` con **6 objetos** (las 6 estrellas de la constelación). Cada uno tiene:

- `title`, `description`: el texto que se muestra al abrir la estrella.
- `date`: `null` por defecto → cámbialo por `'AAAA-MM-DD'` si quieres mostrar fecha.
- `image`: ruta dentro de `public/` (ver 4.4).
- `coords {x, y}`, `size`, `placeholder`: posición y tamaño de la estrella en el mapa.

También hay `memoryLinks`, que define qué estrellas se unen con líneas para
formar el corazón. **No es una imagen**: es un corazón real dibujado con líneas
y estrellas.

### 4.3. Línea de tiempo y carta

- [`src/data/timeline.js`](src/data/timeline.js): 6 hitos. Solo 2 fechas son
  reales (`2026-08-01` y `2026-10-30`); el resto están sin fecha a propósito.
- [`src/data/letter.js`](src/data/letter.js): carta completa (saludo, párrafos,
  cierre y firma) y los textos de la constelación y el final.

### 4.4. Fotografías — carpeta [`public/images/`](public/images/)

Las fotografías reales ya están incluidas. **Mantén exactamente el mismo
nombre y extensión** (GitHub Pages distingue mayúsculas y minúsculas) o
actualiza la ruta en el archivo de datos correspondiente.

```
public/images/recuerdos/imagen1.jpg … imagen6.jpg   → foto de cada recuerdo (memories.js)
public/images/nosotros/imagen1.jpg                  → foto final (Finale.jsx) y portada del reproductor (useMusic.js)
```

Si cambias un archivo (por ejemplo a `.png`), actualiza también la ruta en:
- `memories.js` (campo `image` de cada recuerdo),
- `useMusic.js` (campo `cover`),
- `Finale.jsx` (constante `OUR_PHOTO`).

### 4.5. Canción — [`public/music/`](public/music/)

Coloca tu archivo de audio en:

```
public/music/nuestro-cancion.mp3
```

La música **solo empieza tras la primera interacción del usuario** (requisito de
los navegadores) y **no se reinicia al cambiar de escena**. El título y la
portada del reproductor se editan en [`src/hooks/useMusic.js`](src/hooks/useMusic.js).

---

## 5. Publicar en GitHub Pages

### 5.1. Preparar el repositorio

1. Crea un repositorio en GitHub llamado **`90-dias-infinitos`**.
2. Edita [`package.json`](package.json) y reemplaza **`TU-USUARIO`** por tu
   usuario real de GitHub:

   ```json
   "homepage": "https://TU-USUARIO.github.io/90-dias-infinitos"
   ```

3. Sube el proyecto:

   ```bash
   git init
   git add .
   git commit -m "Primera versión de 90 días, infinitos recuerdos"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/90-dias-infinitos.git
   git push -u origin main
   ```

### 5.2. Desplegar

El proyecto ya incluye `gh-pages` y los scripts necesarios. Solo ejecuta:

```bash
npm run deploy
```

Esto hace `build` (script `predeploy`) y publica la carpeta `dist/` en la rama
`gh-pages`.

### 5.3. Activar GitHub Pages

En el repositorio: **Settings → Pages → Source: Deploy from a branch →
Branch: `gh-pages` / `root` → Save.**

En 1–2 minutos tu experiencia estará en:

```
https://TU-USUARIO.github.io/90-dias-infinitos/
```

### 5.4. Si cambias el nombre del repositorio

Edita **dos** sitios:

1. [`vite.config.js`](vite.config.js) → constante `REPO_NAME`.
2. [`package.json`](package.json) → campo `homepage`.

Y vuelve a ejecutar `npm run deploy`.

---

## 6. Verificación de rutas (imágenes, CSS y música)

Tras `npm run build`, comprueba que:

- **CSS/JS:** `dist/index.html` referencia `/90-dias-infinitos/assets/…`.
- **Imágenes:** `dist/images/recuerdos/…` y `dist/images/nosotros/…` existen.
- **Música:** `dist/music/` existe (coloca ahí tu `.mp3`).
- **`.nojekyll`:** `dist/.nojekyll` está presente (evita que GitHub Pages ignore
  archivos que empiezan con guion bajo).

Si algo no carga en producción, casi siempre es porque `REPO_NAME` en
`vite.config.js` no coincide con el nombre real del repositorio.

---

## 7. Accesibilidad y detalles técnicos

- Respeta `prefers-reduced-motion`: si el usuario lo activa, se reducen las
  animaciones.
- Navegación por teclado: flechas ← → para cambiar de escena, `Esc` para cerrar
  el modal de un recuerdo.
- Reproductor musical con panel en escritorio y botón flotante en móvil.
- Diseño responsive (móvil, tablet, escritorio).

---

Hecho con cariño. 💗
