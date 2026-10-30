# Portafolio — Yeison.Devp

Portafolio personal hecho con **React** y **Vite**. Muestra quién soy, las tecnologías que uso y los proyectos en los que he trabajado.

Lo desarrollé con ayuda de herramientas de IA como **Claude**.

## Características

- **Fondo de puntos interactivo:** un grid de puntos blancos que, al pasar el mouse, se estiran en líneas hacia el cursor como si fuera un imán (hecho con `<canvas>`).
- **Sección parallax:** al hacer scroll, la tarjeta de bienvenida se aleja hacia atrás, la ventana de código entra desde la izquierda y la foto sube desde abajo, con movimiento suavizado.
- **Ventana de código en 3D:** código escrito como texto real (no imagen), inclinado en perspectiva y saliéndose de la caja.
- **Foto con reflejo:** foto sin fondo en blanco y negro, con luz detrás que se intensifica al pasar el mouse y un reflejo tenue en el piso.
- **Logos flotantes:** ventanitas con efecto vidrio (Claude, ChatGPT, Supabase, React, HTML) y otras más tenues al fondo (PostgreSQL, JavaScript, Express, Python).
- **Responsive:** se adapta a teléfono, tablet y computadora.
- **Accesible:** respeta la opción del sistema "reducir movimiento" (`prefers-reduced-motion`).

## Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- CSS puro (sin librerías de estilos)
- [oxlint](https://oxc.rs/) para revisar el código

## Cómo correrlo

Necesitas [Node.js](https://nodejs.org/) instalado.

```bash
# Instalar dependencias
npm install

# Modo desarrollo (abre http://localhost:5173)
npm run dev

# Generar la versión para publicar (carpeta dist/)
npm run build

# Ver la versión publicada en local
npm run preview

# Revisar el código
npm run lint
```

## Estructura

```
src/
├── App.jsx                  # Rutas y fondo general
├── App.css                  # Estilos de toda la página
├── main.jsx                 # Punto de entrada
├── pages/
│   ├── Inicio.jsx           # Página principal (/)
│   └── Portafolio.jsx       # Página de proyectos (/portafolio)
├── components/
│   ├── GridPuntos.jsx       # Fondo de puntos con efecto imán
│   └── ParallaxGithub.jsx   # Sección parallax con foto, código y logos
└── assets/
    ├── img/                 # Fotos (Photome-sinfondo.png, etc.)
    └── logos/               # Logos SVG de las tecnologías
```

## Personalizar

- **Foto:** reemplaza `src/assets/img/Photome-sinfondo.png` por otra imagen PNG sin fondo con el mismo nombre.
- **Nombre y descripción de la tarjeta:** en `src/components/ParallaxGithub.jsx`, dentro de `parallax-card`.
- **Código de la ventana:** en la lista `LINEAS_CODIGO` del mismo archivo.
- **Logos:** agrega el SVG en `src/assets/logos/` y súmalo a `LOGOS_CERCA` o `LOGOS_FONDO`; su posición se define en `App.css` (`.logo-react`, `.logo-claude`, ...).
- **Efecto imán:** ajusta `ESPACIO`, `RADIO` y `LARGO_MAX` al inicio de `src/components/GridPuntos.jsx`.

## Créditos

- Logos de tecnologías: [Simple Icons](https://simpleicons.org/) y [Lobe Icons](https://github.com/lobehub/lobe-icons).
- Los logos pertenecen a sus respectivas marcas y se usan solo para indicar las tecnologías utilizadas.

## Autor

**Yeison** — [GitHub @yeisonPDev](https://github.com/yeisonPDev)
