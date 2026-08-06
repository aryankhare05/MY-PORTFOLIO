import { useEffect, useRef } from 'react'

// Sitewide ambient background: a few large, very slow-moving glowing
// gradient "aurora" blobs, a faint animated grid mesh, and a soft grain
// texture — fixed behind every section so the whole page (not just the
// hero) feels alive. Pure CSS animation; the only JS here nudges the
// blobs' position slightly toward the cursor for a subtle mouse-reactive
// lighting feel. Respects prefers-reduced-motion (blobs/grid stop moving,
// grain and gradients stay as a static backdrop).
export default function BackgroundFX() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    let frame = null
    let targetX = 0.5
    let targetY = 0.5
    let curX = 0.5
    let curY = 0.5

    function handleMove(e) {
      targetX = e.clientX / window.innerWidth
      targetY = e.clientY / window.innerHeight
    }

    function tick() {
      // Ease toward the cursor position — slow, so it never feels twitchy.
      curX += (targetX - curX) * 0.02
      curY += (targetY - curY) * 0.02
      wrap.style.setProperty('--mx', `${curX * 100}%`)
      wrap.style.setProperty('--my', `${curY * 100}%`)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="bg-fx" ref={wrapRef} aria-hidden="true">
      <div className="bg-fx-grid" />
      <div className="bg-fx-blob bg-fx-blob-a" />
      <div className="bg-fx-blob bg-fx-blob-b" />
      <div className="bg-fx-blob bg-fx-blob-c" />
      <div className="bg-fx-cursor-glow" />
      <div className="bg-fx-grain" />
    </div>
  )
}
