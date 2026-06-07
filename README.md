# GobTI — Página del proyecto (Identitas MX)

Landing page del proyecto final de **Gobierno de TI**: un servicio de gestión de accesos
documentado bajo COBIT, ITIL e ISO/IEC 27001:2022. La página presenta el equipo, los
entregables y los documentos (PDFs alojados en Google Drive y embebidos en la página).

Stack: **React 19 + TypeScript + Vite**. Sin librerías de UI externas; todo el estilo es
CSS plano por componente.

---

## Cómo correr el proyecto

```bash
npm install      # instalar dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción a /dist
npm run preview  # previsualizar el build
npm run lint     # revisar errores de lint
```

---

## Estructura

```
src/
  App.tsx                  # arma la página: ordena las secciones
  main.tsx                 # punto de entrada de React
  index.css / App.css      # estilos globales y variables de color
  Components/
    Header.tsx             # barra de navegación + botón Drive
    Herosection.tsx        # portada (título, botones)
    TeamSection.tsx        # integrantes del equipo
    DocsSection.tsx        # ⭐ entregables + visor de PDFs (lo que más se edita)
    MayiaSection.tsx       # sección final + links a Drive
    *.css                  # un CSS por componente
public/                    # imágenes, logos, favicon, QR
```

Cada sección es un componente independiente con su propio `.css`. Para agregar/quitar una
sección completa, se edita el orden en [src/App.tsx](src/App.tsx).

---

## El visor de PDFs (lo más importante)

Los documentos **no viven en el repo**. Están en Google Drive y se embeben con un `<iframe>`
del visor de Drive. Toda la lógica está en [src/Components/DocsSection.tsx](src/Components/DocsSection.tsx).

### Piezas clave

1. **`DRIVE_URL`** — enlace a la carpeta completa de Drive. Lo usan los botones "Abrir en Drive".
   > ⚠️ Esta constante está **repetida** en varios componentes (Header, Herosection,
   > MayiaSection, DocsSection). Si cambia la carpeta, hay que actualizarla en **todos**.

2. **`PDF_IDS`** — mapa de `pestaña → ID del PDF`. Aquí se conecta cada documento.

   ```ts
   const PDF_IDS: Partial<Record<TabId, string>> = {
     cedula:       '1Q2S1iwt...', // CEDULA DE SERVICIO SEGUNDA PARTE
     matriz:       '1SSKJ2mt...', // 5 Riesgos Gestion Accesos
     plan:         '1e6QzCbY...', // Administración de disponibilidad
     caso:         '1vHzpZsn...', // casosnegocio
     'metas-corp': '10lCTN6C...', // MetaCorporativas y Mapa Estratégico
     mapa:         '10lCTN6C...', // (mismo PDF que metas-corp)
     'metas-ti':   '1dK7aY70...', // metasTI
   }
   ```

3. **`<PdfEmbed />`** — componente que dibuja el visor + botones Abrir/Descargar.
   Se usa de dos formas:
   - `<PdfEmbed tabId="matriz" title="..." />` → toma el ID desde `PDF_IDS`.
   - `<PdfEmbed id="1Spr..." title="..." />` → ID directo (para un 2º PDF en la misma pestaña).

   Si no hay ID, no renderiza nada (no rompe la página).

---

## Cómo agregar un PDF nuevo

1. **Sube el PDF a la carpeta de Drive.**
2. **Compártelo:** clic derecho → Compartir → **"Cualquier persona con el enlace"**.
   > Si queda como "Restringido", el iframe sale en blanco para los demás.
3. **Copia el ID:** del enlace
   `https://drive.google.com/file/d/`**`ESTE_ES_EL_ID`**`/view?usp=...` copia la parte del medio.
4. **Pega el ID en `PDF_IDS`** ([DocsSection.tsx](src/Components/DocsSection.tsx)) bajo la
   pestaña que corresponda.
5. **Coloca el visor en la pestaña.** Busca el componente `Tab...` de esa sección y agrega:
   ```tsx
   <PdfEmbed tabId="LA_PESTAÑA" title="Nombre del PDF.pdf" />
   ```
   (normalmente justo antes del `<PendingCard ... />` que ya está ahí).

---

## Cómo agregar una pestaña nueva

En [DocsSection.tsx](src/Components/DocsSection.tsx):

1. Agrega el `id` en el tipo **`TabId`** (la lista de `'introduccion' | ...`).
2. Agrega un objeto en el array **`TABS`** (`{ id, label, icon }`). El orden del array
   = orden en el menú lateral.
3. Crea el componente de contenido, ej. `const TabNueva = () => (...)`.
4. Conéctalo en el `switch` de **`renderContent()`** (`case 'nueva': return <TabNueva />`).
5. (Opcional) Si lleva PDF, agrégalo a `PDF_IDS` y usa `<PdfEmbed tabId="nueva" .../>`.

---

## Estado de los documentos

| Pestaña | PDF |
|---|---|
| Cédula de Servicio | ✅ |
| Matriz de Riesgos (CID) | ✅ |
| Plan de Continuidad | ✅ |
| Caso de Negocio | ✅ |
| Metas Corporativas | ✅ |
| Mapa Estratégico | ✅ |
| Metas de TI | ✅ |
| Cascada de Metas | ❌ pendiente |
| Arquitectura del Servicio | ❌ pendiente |
| Inventario de Activos | ❌ pendiente |
| BIA Táctico | ❌ pendiente |
| BIA Operacional | ❌ pendiente |
| Matriz de Infraestructuras Críticas (sub-sección) | ❌ pendiente |

Introducción, Objetivo, Descripción y Misión/Visión/Valores no usan PDF: su contenido está
escrito directo en la página.

---

## Notas

- **Las tarjetas "Pendiente"** (`<PendingCard />`) son marcadores visuales mientras no hay
  PDF. Cuando agregas el visor, puedes dejar la tarjeta o borrarla.
- **El "QR" de las tarjetas es decorativo**, no es un QR real escaneable.
- Tras cualquier cambio, valida con `npm run build` (corre el chequeo de TypeScript).
