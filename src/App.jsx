import { useState } from 'react'
import './App.css'

const tarjetas = [
  { titulo: 'Proyectos', valor: '12', detalle: '3 en progreso' },
  { titulo: 'Tareas', valor: '48', detalle: '9 pendientes' },
  { titulo: 'Visitas', valor: '1.2k', detalle: 'Este mes' },
]

function App() {
  const [nombre, setNombre] = useState('Yeison')

  return (
    <>
      <div className="fondo" aria-hidden="true">
        <span className="brillo brillo-1"></span>
        <span className="brillo brillo-2"></span>
      </div>

      <nav className="navbar">
        <span className="logo">{nombre || 'Dashboard'}</span>
        <ul>
          <li><a href="#" className="activo">Inicio</a></li>
          <li><a href="#">Proyectos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>

      <main className="contenido">
        <section className="tarjeta principal">
          <h1>
            Hola, <span className="degradado">{nombre || 'visitante'}</span>
          </h1>
          <p className="subtitulo">Bienvenido a tu panel</p>

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

export default App
