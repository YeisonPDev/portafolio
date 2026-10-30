import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import GridPuntos from '../components/GridPuntos.jsx'
import ParallaxGithub from '../components/ParallaxGithub.jsx'
import imagenGithub from '../assets/imagegithub.png'

function Inicio() {
  const cardRef = useRef(null)

  // Al bajar, la card del centro se aleja hacia atrás según cuánto se haya bajado
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    function actualizar() {
      frame = 0
      const p = Math.min(window.scrollY / window.innerHeight, 1)
      cardRef.current.style.transform =
        `perspective(1000px) translateZ(${p * -400}px) translateY(${p * 120}px)`
      cardRef.current.style.opacity = String(1 - p * 0.9)
    }

    function alScroll() {
      if (!frame) frame = requestAnimationFrame(actualizar)
    }

    actualizar()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alScroll)
    }
  }, [])

  return (
    <>
      <GridPuntos />

      {/* Barra superior */}
      <nav className="barra-negra barra-arriba">
        <span className="barra-titulo">Yeison.Devp</span>
        <ul>
          <li>
            <a href="#" aria-label="GitHub">
              <img src={imagenGithub} style={{ borderRadius: '50%' }} alt="GitHub" className="icono-barra" />
            </a>
          </li>
          <li><a href="#">Enlace 2</a></li>
        </ul>
      </nav>

      <main className="centro">
        <section className="tarjeta bienvenida" ref={cardRef}>
          <h1>
             <span className="degradado">Portafolio </span>
          </h1>
          <p className="subtitulo">Bienvenido a mi portafolio, conoce un poco de lo que eh hecho y de lo que hago de vez en cuando mientras trabajo.</p>
          <Link to="/portafolio" className="boton">
            Ver portafolio
          </Link>
        </section>
      </main>

      {/* Sección parallax */}
      <ParallaxGithub />
    </>
  )
}

export default Inicio
