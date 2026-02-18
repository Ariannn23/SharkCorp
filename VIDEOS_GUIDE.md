# Cómo Agregar Videos a los Proyectos

## Paso 1: Agregar el campo `video` al schema

Edita el archivo de schema de tus proyectos para incluir el campo opcional `video`:

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    video: z.string().optional(), // ← Agregar esta línea
    category: z.enum(["Web", "Mobile", "SaaS"]),
    tags: z.array(z.string()),
    link: z.string().url(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
```

## Paso 2: Agregar videos a tus proyectos

En los archivos `.md` de tus proyectos en `src/content/projects/`, agrega el campo `video`:

```markdown
---
title: "Mi Proyecto Increíble"
description: "Una descripción del proyecto"
image: "/images/proyecto.jpg"
video: "/videos/proyecto-demo.mp4" # ← Agregar esta línea
category: "Web"
tags: ["React", "TypeScript"]
link: "https://ejemplo.com"
---
```

## Paso 3: Colocar los videos

Coloca tus videos en la carpeta `public/videos/`:

```
public/
  videos/
    proyecto-demo.mp4
    otro-proyecto.mp4
```

## Características del Video

- ✅ **Auto-play al hover**: El video se reproduce automáticamente cuando pasas el mouse
- ✅ **Pausa automática**: Se pausa y reinicia cuando quitas el mouse
- ✅ **Muted**: Los videos están silenciados para mejor UX
- ✅ **Loop**: Se repiten continuamente mientras haces hover
- ✅ **Poster fallback**: Muestra la imagen mientras carga el video
- ✅ **Badge indicator**: Muestra "Video Preview" en la esquina
- ✅ **Fallback a imagen**: Si no hay video, muestra la imagen normal

## Formato Recomendado

- **Formato**: MP4 (H.264)
- **Duración**: 5-10 segundos
- **Resolución**: 1280x720 o 1920x1080
- **Tamaño**: < 5MB para mejor performance
- **FPS**: 30fps

## Herramientas para Crear Videos

### Opción 1: Grabar tu pantalla

- **OBS Studio** (gratis): https://obsproject.com/
- **ShareX** (Windows, gratis)
- **QuickTime** (Mac, incluido)

### Opción 2: Convertir GIF a MP4

```bash
ffmpeg -i input.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4
```

### Opción 3: Comprimir video existente

```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1M output.mp4
```

## Ejemplo de Video Placeholder

He creado un video de ejemplo simple que puedes usar mientras preparas tus videos reales:

**URL del video de ejemplo**:
`https://cdn.pixabay.com/video/2022/12/11/142838-779726453_tiny.mp4`

Este es un video corto y ligero perfecto para testing.

## Ejemplo Completo

```markdown
---
title: "Dashboard Financiero"
description: "Panel de control para análisis financiero en tiempo real"
image: "/images/fintech-dashboard.jpg"
video: "/videos/fintech-dashboard-demo.mp4"
category: "Web"
tags: ["React", "D3.js", "Python"]
link: "https://dashboard.ejemplo.com"
---

# Dashboard Financiero

Contenido del proyecto...
```

## Tips de Performance

1. **Lazy loading**: Los videos solo se cargan cuando están en viewport
2. **Compresión**: Usa herramientas como HandBrake para comprimir
3. **CDN**: Considera usar un CDN para servir los videos
4. **Formatos múltiples**: Puedes agregar WebM como alternativa:

```jsx
<video>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```
