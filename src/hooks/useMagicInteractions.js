import { useEffect } from 'react'

// One global, event-delegated hook that powers every "premium" micro-interaction
// site-wide, so individual components don't each need their own mouse-tracking
// code. Pure vanilla JS + CSS custom properties — no animation library.
//
// Handles, via delegation on `document`:
//   - `.btn`       -> glow-follow highlight + gentle magnetic pull toward cursor
//   - `.btn` (click) -> a short-lived ripple element
//   - `.tilt-card`  -> subtle 3D tilt + spotlight highlight that follows the pointer
//                      (used by the Skills and Project cards)
//
// Skipped entirely for touch/coarse-pointer devices and for
// prefers-reduced-motion, so mobile stays light and accessible.
export function useMagicInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    function handlePointerMove(e) {
      const btn = e.target.closest('.btn')
      if (btn) {
        const rect = btn.getBoundingClientRect()
        const px = e.clientX - rect.left
        const py = e.clientY - rect.top
        btn.style.setProperty('--glow-x', `${px}px`)
        btn.style.setProperty('--glow-y', `${py}px`)

        // Gentle magnetic pull — a few px max, never enough to misalign clicks.
        const cx = rect.width / 2
        const cy = rect.height / 2
        const dx = ((px - cx) / cx) * 4
        const dy = ((py - cy) / cy) * 4
        btn.style.setProperty('--magnet-x', `${dx}px`)
        btn.style.setProperty('--magnet-y', `${dy}px`)
      }

      const tiltCard = e.target.closest('.tilt-card')
      if (tiltCard) {
        const rect = tiltCard.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        const rotateY = (px - 0.5) * 10
        const rotateX = (0.5 - py) * 10
        tiltCard.style.setProperty('--tilt-x', `${rotateX}deg`)
        tiltCard.style.setProperty('--tilt-y', `${rotateY}deg`)
        tiltCard.style.setProperty('--spot-x', `${px * 100}%`)
        tiltCard.style.setProperty('--spot-y', `${py * 100}%`)
      }

      const spotlightCard = e.target.closest('.spotlight-card')
      if (spotlightCard && spotlightCard !== tiltCard) {
        const rect = spotlightCard.getBoundingClientRect()
        spotlightCard.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
        spotlightCard.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
      }
    }

    function handlePointerOut(e) {
      const btn = e.target.closest('.btn')
      if (btn && !btn.contains(e.relatedTarget)) {
        btn.style.setProperty('--magnet-x', '0px')
        btn.style.setProperty('--magnet-y', '0px')
      }
      const tiltCard = e.target.closest('.tilt-card')
      if (tiltCard && !tiltCard.contains(e.relatedTarget)) {
        tiltCard.style.setProperty('--tilt-x', '0deg')
        tiltCard.style.setProperty('--tilt-y', '0deg')
      }
    }

    function handleClick(e) {
      const btn = e.target.closest('.btn')
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'btn-ripple'
      ripple.style.left = `${e.clientX - rect.left}px`
      ripple.style.top = `${e.clientY - rect.top}px`
      btn.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerout', handlePointerOut)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerout', handlePointerOut)
      document.removeEventListener('click', handleClick)
    }
  }, [])
}
