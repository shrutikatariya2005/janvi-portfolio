import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './hooks'

// Smooth custom cursor with a trailing ring. Hidden on touch devices.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    document.documentElement.classList.add('has-cursor')

    let x = -100, y = -100, rx = -100, ry = -100, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
    }
    const over = (e) => {
      const hot = e.target.closest('a, button, input, textarea, [data-hover]')
      ring.current?.classList.toggle('hot', !!hot)
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
