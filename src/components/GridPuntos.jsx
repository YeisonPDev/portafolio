import { useEffect, useRef } from 'react'

// Grid de puntos blancos. Cerca del cursor los puntos se estiran
// en líneas que apuntan hacia él, como limaduras atraídas por un imán.
const ESPACIO = 28 // distancia entre puntos (px)
const RADIO = 160 // alcance del "imán" (px)
const LARGO_MAX = 18 // largo máximo de la línea (px)

function GridPuntos() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ancho = 0
    let alto = 0
    let frame = 0
    // Posición real del cursor y posición suavizada que sigue al cursor
    const raton = { x: -9999, y: -9999, activo: false }
    const suave = { x: -9999, y: -9999, fuerza: 0 }

    function ajustarTamano() {
      const dpr = window.devicePixelRatio || 1
      ancho = window.innerWidth
      alto = window.innerHeight
      canvas.width = ancho * dpr
      canvas.height = alto * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function dibujar() {
      // Suavizado para que el efecto entre y salga sin saltos
      if (suave.x === -9999) {
        suave.x = raton.x
        suave.y = raton.y
      }
      suave.x += (raton.x - suave.x) * 0.2
      suave.y += (raton.y - suave.y) * 0.2
      suave.fuerza += ((raton.activo ? 1 : 0) - suave.fuerza) * 0.1

      ctx.clearRect(0, 0, ancho, alto)
      ctx.lineCap = 'round'

      const offsetX = (ancho % ESPACIO) / 2
      const offsetY = (alto % ESPACIO) / 2

      for (let x = offsetX; x <= ancho; x += ESPACIO) {
        for (let y = offsetY; y <= alto; y += ESPACIO) {
          const dx = suave.x - x
          const dy = suave.y - y
          const dist = Math.hypot(dx, dy)
          const t = dist < RADIO ? (1 - dist / RADIO) * suave.fuerza : 0

          if (t > 0.02) {
            // Línea que sale del punto y apunta hacia el cursor
            const ux = dx / (dist || 1)
            const uy = dy / (dist || 1)
            const largo = LARGO_MAX * t
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + 0.65 * t})`
            ctx.lineWidth = 1.5 + t
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + ux * largo, y + uy * largo)
            ctx.stroke()
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
            ctx.beginPath()
            ctx.arc(x, y, 1.2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (!reducido) frame = requestAnimationFrame(dibujar)
    }

    function mover(e) {
      const punto = e.touches ? e.touches[0] : e
      raton.x = punto.clientX
      raton.y = punto.clientY
      raton.activo = true
      if (reducido) dibujar()
    }

    function salir() {
      raton.activo = false
      if (reducido) dibujar()
    }

    ajustarTamano()
    dibujar()

    const alRedimensionar = () => {
      ajustarTamano()
      if (reducido) dibujar()
    }

    window.addEventListener('resize', alRedimensionar)
    window.addEventListener('pointermove', mover)
    window.addEventListener('touchmove', mover, { passive: true })
    document.addEventListener('pointerleave', salir)
    window.addEventListener('blur', salir)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', alRedimensionar)
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('touchmove', mover)
      document.removeEventListener('pointerleave', salir)
      window.removeEventListener('blur', salir)
    }
  }, [])

  return <canvas ref={canvasRef} className="grid-puntos" aria-hidden="true" />
}

export default GridPuntos
