import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './hooks'

// Floating particle grid that gently reacts to the pointer
export default function ParticleGrid() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    let w = 0, h = 0, pts = [], raf
    const mouse = { x: -999, y: -999 }

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const gap = w < 600 ? 44 : 56
      pts = []
      for (let x = gap / 2; x < w; x += gap)
        for (let y = gap / 2; y < h; y += gap) pts.push({ ox: x, oy: y, x, y, p: Math.random() * 6 })
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        const drift = reduced ? 0 : Math.sin(t / 1400 + p.p) * 3
        const dx = p.ox - mouse.x
        const dy = p.oy - mouse.y
        const d = Math.hypot(dx, dy)
        const push = d < 120 && !reduced ? (1 - d / 120) * 18 : 0
        p.x = p.ox + (d ? (dx / d) * push : 0)
        p.y = p.oy + drift + (d ? (dy / d) * push : 0)
        const near = d < 140 ? 1 - d / 140 : 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2 + near * 2, 0, Math.PI * 2)
        ctx.fillStyle = near > 0.05 ? `rgba(6,182,212,${0.35 + near * 0.6})` : 'rgba(148,163,184,0.45)'
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    build()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', build)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas className="particles" ref={ref} aria-hidden="true" />
}
