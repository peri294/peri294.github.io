# Portfolio — Nicolás Guzzo Punta

Sitio estático bilingüe (ES/EN) en HTML, CSS y JS, sin dependencias ni build.

## Estructura

```
index.html        Todo el contenido, en los dos idiomas
css/styles.css    Estilos; el color de acento está en --accent
js/main.js        Cambio de idioma, menú móvil, animaciones, copiar email
assets/           cv-es.pdf, cv-en.pdf, capturas de Comanda, favicon.svg
```

## Editar contenido

Cada texto existe dos veces, marcado con `data-lang`:

```html
<p data-lang="es">Texto en español</p>
<p data-lang="en">Text in English</p>
```

Solo se muestra el del idioma activo. Al agregar o cambiar un texto, editá ambas versiones.

- **Nuevo proyecto:** copiá un `<article class="project">` dentro de `#proyectos`.
- **Nuevo CV:** reemplazá `assets/cv-es.pdf` y `assets/cv-en.pdf` con el mismo nombre.
- **Idioma inicial:** el del navegador del visitante; después se recuerda el que eligió.

## Verlo localmente

Abrí `index.html` en el navegador, o levantá un servidor con `npx serve .`

## Publicarlo gratis

- **GitHub Pages:** subí la carpeta a un repo → Settings → Pages → rama `main`.
  Si el repo se llama `peri294.github.io`, la URL queda `https://peri294.github.io`.
- **Vercel o Netlify:** importá el repo o arrastrá la carpeta; no hace falta configurar nada.
