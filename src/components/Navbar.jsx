import { useEffect, useState } from 'react'
import Icon from './Icon'
import { profile } from '../data/profile'
import { links } from '../data/links'
import { isPlaceholder } from '../utils/isPlaceholder'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)
  const hasResume = !isPlaceholder(links.resumeUrl)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
      // Drives the thin progress bar at the very top of the page — reuses
      // this same scroll listener rather than adding a second one.
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      doc.style.setProperty('--scroll-progress', `${pct}%`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(id) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="container navbar-inner">
        <button type="button" className="navbar-brand" onClick={() => goTo('home')}>
          {profile.name}
          <span className="navbar-brand-dot">.</span>
        </button>

        <nav className="navbar-links" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navbar-link ${activeId === item.id ? 'navbar-link-active' : ''}`}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          {hasResume && (
            <a
              className="btn btn-primary navbar-resume-btn"
              href={links.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="download" size={15} />
              Resume
            </a>
          )}
          <button
            type="button"
            className="navbar-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div className="navbar-mobile">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navbar-mobile-link ${activeId === item.id ? 'navbar-link-active' : ''}`}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          {hasResume && (
            <a className="btn btn-primary" href={links.resumeUrl} target="_blank" rel="noreferrer">
              <Icon name="download" size={15} />
              Resume
            </a>
          )}
        </div>
      )}
    </header>
  )
}
