import { useEffect, useRef } from 'react'
import imagenGithub from '../assets/imagegithub.png'
// Foto de la derecha: Photome.jpg con el fondo quitado (guardada como PNG transparente)
import fotoPerfil from '../assets/img/Photome-sinfondo.png'
// Logos de las ventanitas flotantes
import logoClaude from '../assets/logos/claude.svg'
import logoChatgpt from '../assets/logos/chatgpt.svg'
import logoSupabase from '../assets/logos/supabase.svg'
import logoReact from '../assets/logos/react.svg'
import logoHtml from '../assets/logos/html5.svg'
import logoPostgres from '../assets/logos/postgresql.svg'
import logoJs from '../assets/logos/javascript.svg'
import logoExpress from '../assets/logos/express.svg'
import logoPython from '../assets/logos/python.svg'

// Ventanitas cerca de la foto (la posición está en App.css: .logo-claude, .logo-react, ...)
const LOGOS_CERCA = [
  { nombre: 'claude', src: logoClaude, alt: 'Claude' },
  { nombre: 'chatgpt', src: logoChatgpt, alt: 'ChatGPT' },
  { nombre: 'supabase', src: logoSupabase, alt: 'Supabase' },
  { nombre: 'react', src: logoReact, alt: 'React' },
  { nombre: 'html', src: logoHtml, alt: 'HTML' },
]

// Ventanitas al fondo, muy tenues
const LOGOS_FONDO = [
  { nombre: 'postgres', src: logoPostgres, alt: 'PostgreSQL' },
  { nombre: 'js', src: logoJs, alt: 'JavaScript' },
  { nombre: 'express', src: logoExpress, alt: 'Express' },
  { nombre: 'python', src: logoPython, alt: 'Python' },
]

// Código de la izquierda escrito como texto (se ve nítido en cualquier tamaño).
// Antes era la imagen ../assets/img/linesCode.png
const LINEAS_CODIGO = [
  [['k', 'function '], ['f', 'alScroll'], ['p', '() {']],
  [['p', '  '], ['k', 'if '], ['p', '(!frame) frame = '], ['f', 'requestAnimationFrame'], ['p', '(actualizar)']],
  [['p', '}']],
  [],
  [['f', 'actualizar'], ['p', '()']],
  [['p', 'window.'], ['f', 'addEventListener'], ['p', '('], ['s', "'scroll'"], ['p', ', alScroll, { passive: '], ['k', 'true'], ['p', ' })']],
  [['p', 'window.'], ['f', 'addEventListener'], ['p', '('], ['s', "'resize'"], ['p', ', alScroll)']],
  [['k', 'return '], ['p', '() => {']],
  [['p', '  '], ['f', 'cancelAnimationFrame'], ['p', '(frame)']],
  [['p', '  window.'], ['f', 'removeEventListener'], ['p', '('], ['s', "'scroll'"], ['p', ', alScroll)']],
  [['p', '  window.'], ['f', 'removeEventListener'], ['p', '('], ['s', "'resize'"], ['p', ', alScroll)']],
  [['p', '}']],
]

const limitar = (n) => Math.min(Math.max(n, 0), 1)

// Sección negra con parallax:
// - capa de fondo: las imágenes grandes y un poco borrosas
// - capa de arriba: las mismas imágenes nítidas a los lados y la card de GitHub
// Al hacer scroll la escena sube poco a poco y las imágenes se mueven a distinta velocidad.
function ParallaxGithub() {
  const seccionRef = useRef(null)
  const fondoRef = useRef(null)
  const escenaRef = useRef(null)
  const izqRef = useRef(null)
  const derRef = useRef(null)
  const logosCercaRef = useRef(null)
  const logosFondoRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let frameEntrada = 0
    // Progreso de entrada: "objetivo" según el scroll y "suave" que lo sigue poco a poco
    let pObjetivo = 0
    let pSuave = null
    let avance = 0

    // Entrada de la foto (desde abajo) y del código (desde la izquierda), con suavizado
    function animarEntrada() {
      pSuave += (pObjetivo - pSuave) * 0.08
      if (Math.abs(pObjetivo - pSuave) < 0.001) pSuave = pObjetivo
      const falta = 1 - pSuave // 1 = todavía afuera, 0 = en su lugar

      // Foto: sube desde bien abajo y aparece
      const fotoY = falta * 650
      derRef.current.style.transform = `translateY(${fotoY}px)`
      derRef.current.style.opacity = String(Math.min(1, pSuave * 1.4))
      // Logos: los de cerca se mueven un poco más y los del fondo un poco menos (profundidad)
      logosCercaRef.current.style.transform = `translateY(${fotoY * 0.25}px)`
      logosFondoRef.current.style.transform = `translateY(${fotoY * -0.3}px)`

      // Código: entra desde fuera de la pantalla por la izquierda
      const codigoX = falta * -window.innerWidth * 0.7
      izqRef.current.style.transform = `translate(${codigoX}px, ${avance * -0.2}px)`
      izqRef.current.style.opacity = String(Math.min(1, pSuave * 1.4))

      frameEntrada = pSuave === pObjetivo ? 0 : requestAnimationFrame(animarEntrada)
    }

    function actualizar() {
      frame = 0
      const rect = seccionRef.current.getBoundingClientRect()
      const alto = window.innerHeight
      // 0 cuando la sección asoma por abajo, 1 cuando su borde superior llega arriba
      const p = limitar(1 - rect.top / alto)
      // Movimiento continuo mientras la sección está en pantalla
      avance = rect.top + rect.height / 2 - alto / 2

      fondoRef.current.style.transform = `translateY(${avance * 0.3}px)`
      escenaRef.current.style.transform = `translateY(${(1 - p) * 160}px)`
      escenaRef.current.style.opacity = String(0.2 + p * 0.8)

      // Al bajar, la foto sube y el código entra; al subir, se van (con suavizado)
      pObjetivo = p
      if (pSuave === null) pSuave = p
      if (!frameEntrada) frameEntrada = requestAnimationFrame(animarEntrada)
    }

    function alScroll() {
      if (!frame) frame = requestAnimationFrame(actualizar)
    }

    actualizar()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(frameEntrada)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alScroll)
    }
  }, [])

  return (
    <section className="parallax" ref={seccionRef}>
      {/* Capa de fondo: humo borroso propio, no son las imágenes */}
      <div className="parallax-fondo-marco" aria-hidden="true">
        <div className="parallax-fondo" ref={fondoRef}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Capa de arriba: imágenes nítidas + card */}
      <div className="parallax-escena" ref={escenaRef}>
        {/* Ventana de código saliendo en diagonal desde la esquina inferior izquierda.
            El div de afuera recibe el movimiento del parallax; el de adentro, la inclinación. */}
        <div ref={izqRef} className="parallax-codigo-mover" aria-hidden="true">
          <div className="parallax-codigo">
            <div className="parallax-codigo-barra">
              <span></span><span></span><span></span>
            </div>
            <pre>
              {LINEAS_CODIGO.map((linea, i) => (
                <div key={i}>
                  {linea.length === 0
                    ? ' '
                    : linea.map(([tipo, texto], j) => (
                        <span key={j} className={`cod-${tipo}`}>{texto}</span>
                      ))}
                </div>
              ))}
            </pre>
          </div>
        </div>
        {/* Foto de perfil parada en la esquina inferior derecha, con luz detrás */}
        <div ref={derRef} className="parallax-foto-mover">
          <div className="parallax-foto">
            <span className="parallax-foto-luz" aria-hidden="true"></span>

            {/* Logos al fondo, detrás de la foto y muy tenues */}
            <div className="logos-fondo" ref={logosFondoRef} aria-hidden="true">
              {LOGOS_FONDO.map((logo) => (
                <span key={logo.nombre} className={`logo-flotante logo-${logo.nombre}`}>
                  <img src={logo.src} alt="" />
                </span>
              ))}
            </div>

            <span className="parallax-foto-piso" aria-hidden="true"></span>

            {/* Reflejo muy tenue debajo de los pies */}
            <div className="parallax-foto-reflejo" aria-hidden="true">
              <img src={fotoPerfil} alt="" />
            </div>

            <img className="parallax-foto-persona" src={fotoPerfil} alt="Yeison" />

            {/* Logos cerca de la foto */}
            <div className="logos-cerca" ref={logosCercaRef}>
              {LOGOS_CERCA.map((logo) => (
                <span key={logo.nombre} className={`logo-flotante logo-${logo.nombre}`} title={logo.alt}>
                  <img src={logo.src} alt={logo.alt} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="parallax-card">
          {/* Cambia href="#" por el enlace que quieras */}
          <a href="#" className="parallax-logo" aria-label="GitHub">
            <img src={imagenGithub} alt="GitHub" />
          </a>
          <div className="parallax-texto">
            <h2>Yeison.Devp</h2>
            <p>Desarrollador web. Aquí va una pequeña descripción sobre ti.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ParallaxGithub
