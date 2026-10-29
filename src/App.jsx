import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Portafolio from './pages/Portafolio.jsx'
import './App.css'

function App() {
  return (
    <>
      <div className="fondo" aria-hidden="true">
        <span className="brillo brillo-1"></span>
        <span className="brillo brillo-2"></span>
      </div>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/portafolio" element={<Portafolio />} />
      </Routes>
    </>
  )
}

export default App
