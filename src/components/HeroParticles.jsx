import { useEffect, useRef } from 'react'

// Lightweight canvas "constellation" background for the hero section.
// Plain <canvas> + requestAnimationFrame — no animation library. Particles
// drift very slowly, occasionally link with faint lines when close together,
// and gently react to the mouse. Respects prefers-reduced-motion (renders a
// single static, near-invisible frame instead of animating) and pauses
// entirely when the tab isn't visible to keep it cheap.
export default function HeroParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let rafId = null
    let running = true

    const mouse = { x: -9999, y: -9999, active: false }

    const ACCENT = '45, 212, 191' // matches --accent-rgb in variables.css
    const LINK_DIST = 130
    const MOUSE_DIST = 150

    function particleCount() {
      // Density scales with area, capped so it stays subtle and cheap.
      const area = width * height
      return Math.min(70, Math.max(24, Math.round(area / 18000)))
    }

    function createParticles() {
      const count = particleCount()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Very gentle attraction toward the mouse when nearby
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_DIST && dist > 0.01) {
            p.x += (dx / dist) * 0.04
            p.y += (dy / dist) * 0.04
          }
        }

        // Wrap around edges so motion never abruptly stops/resets
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, 0.4)`
        ctx.fill()
      }

      // Connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${ACCENT}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      if (running) rafId = requestAnimationFrame(step)
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    function handleMouseLeave() {
      mouse.active = false
    }

    function handleVisibility() {
      if (document.hidden) {
        running = false
        if (rafId) cancelAnimationFrame(rafId)
      } else if (!reduceMotionQuery.matches) {
        running = true
        rafId = requestAnimationFrame(step)
      }
    }

    resize()

    if (reduceMotionQuery.matches) {
      // Draw a single static, very faint frame and stop — no animation loop.
      running = false
      step()
    } else {
      running = true
      rafId = requestAnimationFrame(step)
      canvas.parentElement.addEventListener('mousemove', handleMouseMove)
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave)
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      canvas.parentElement.removeEventListener('mousemove', handleMouseMove)
      canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
}
