import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const tarjetas = [
  { titulo: 'Proyectos', valor: '12', detalle: '3 en progreso' },
  { titulo: 'Tareas', valor: '48', detalle: '9 pendientes' },
  { titulo: 'Visitas', valor: '1.2k', detalle: 'Este mes' },
]

function Portafolio() {
  const [nombre, setNombre] = useState('Yeison')

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">{nombre || 'Portafolio'}</Link>
        <ul>
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/portafolio">Portafolio</NavLink></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <main className="contenido">
        <section className="tarjeta principal">
          <h1>
            Hola, soy <span className="degradado">{nombre || 'visitante'}</span>
          </h1>
          <p className="subtitulo">Este es mi portafolio</p>

          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            placeholder="Escribe tu nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        </section>

        <section className="grid">
          {tarjetas.map((t) => (
            <article key={t.titulo} className="tarjeta stat">
              <span className="stat-titulo">{t.titulo}</span>
              <span className="stat-valor">{t.valor}</span>
              <span className="stat-detalle">{t.detalle}</span>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}

export default Portafolio
