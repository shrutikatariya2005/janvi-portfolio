import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from './hooks'

// Floating icy glass prisms with mouse tilt (light theme)
export default function Prisms() {
  const mount = useRef(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const reduced = prefersReducedMotion()

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return // WebGL unavailable: the CSS gradient background remains
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 11)

    scene.add(new THREE.AmbientLight(0xf8fafc, 1.1))
    const key = new THREE.PointLight(0x38bdf8, 60, 40)
    key.position.set(5, 6, 6)
    scene.add(key)
    const rim = new THREE.PointLight(0x00f0ff, 40, 40)
    rim.position.set(-6, -3, 5)
    scene.add(rim)
    const fill = new THREE.DirectionalLight(0xffffff, 1.4)
    fill.position.set(0, 4, 8)
    scene.add(fill)

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xdff4fd,
      metalness: 0.1,
      roughness: 0.08,
      transparent: true,
      opacity: 0.55,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    })
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x0891b2, transparent: true, opacity: 0.55 })

    const shapes = [
      { geo: new THREE.OctahedronGeometry(1.5), pos: [3.6, 0.6, 0], s: 1.25 },
      { geo: new THREE.TetrahedronGeometry(1.2), pos: [-4.2, 1.8, -1.5], s: 1 },
      { geo: new THREE.IcosahedronGeometry(1.0, 0), pos: [-2.4, -2.4, 0.5], s: 0.95 },
      { geo: new THREE.CylinderGeometry(0.1, 1.0, 2.2, 3), pos: [1.0, -2.8, -1], s: 1 },
      { geo: new THREE.OctahedronGeometry(0.6), pos: [5.2, 3.2, -2], s: 1 },
      { geo: new THREE.TetrahedronGeometry(0.55), pos: [-0.6, 3.4, -2.5], s: 1 },
    ]

    const group = new THREE.Group()
    const meshes = shapes.map((sh, i) => {
      const m = new THREE.Mesh(sh.geo, glass)
      m.scale.setScalar(sh.s)
      m.position.set(...sh.pos)
      m.userData = { base: sh.pos[1], speed: 0.4 + i * 0.12, phase: i * 1.3 }
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(sh.geo), edgeMat)
      m.add(edges)
      group.add(m)
      return m
    })
    scene.add(group)

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      // push shapes off-center on narrow screens
      group.position.x = w < 700 ? 0 : 0
      group.scale.setScalar(w < 700 ? 0.6 : 1)
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: 0, y: 0 }
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    const clock = new THREE.Clock()
    let raf
    const tick = () => {
      const t = clock.getElapsedTime()
      meshes.forEach((m) => {
        if (!reduced) {
          m.rotation.x = t * 0.15 * m.userData.speed + m.userData.phase
          m.rotation.y = t * 0.22 * m.userData.speed
          m.position.y = m.userData.base + Math.sin(t * m.userData.speed + m.userData.phase) * 0.25
        }
      })
      // mouse tilt
      group.rotation.y += (mouse.x * 0.35 - group.rotation.y) * 0.05
      group.rotation.x += (mouse.y * 0.2 - group.rotation.x) * 0.05
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      shapes.forEach((s) => s.geo.dispose())
      glass.dispose()
      edgeMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="prisms" ref={mount} aria-hidden="true" />
}
