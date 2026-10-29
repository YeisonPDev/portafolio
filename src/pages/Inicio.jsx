import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <main className="centro">
      <section className="tarjeta bienvenida">
        <h1>
           <span className="degradado">Portafolio </span>
        </h1>
        <p className="subtitulo">Bienvenido a mi portafolio, conoce un poco de lo que eh hecho y de lo que hago de vez en cuando mientras trabajo.</p>
        <Link to="/portafolio" className="boton">
          Ver portafolio
        </Link>
      </section>
    </main>
  )
}

export default Inicio
