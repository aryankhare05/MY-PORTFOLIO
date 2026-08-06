import Icon from './Icon'
import { profile } from '../data/profile'
import { links } from '../data/links'
import { isPlaceholder } from '../utils/isPlaceholder'

const SOCIAL_LINKS = [
  { key: 'github', icon: 'github', href: links.github },
  { key: 'linkedin', icon: 'linkedin', href: links.linkedin },
  { key: 'email', icon: 'mail', href: `mailto:${links.email}`, gate: links.email },
].filter((s) => !isPlaceholder(s.gate ?? s.href))

export default function Footer() {
  function goToTop() {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite.
        </p>

        {SOCIAL_LINKS.length > 0 && (
          <div className="footer-socials">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.key} className="icon-btn" href={s.href} target="_blank" rel="noreferrer" aria-label={s.key}>
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        )}

        <button type="button" className="footer-top-btn" onClick={goToTop} aria-label="Back to top">
          <Icon name="arrowUp" size={16} />
        </button>
      </div>
    </footer>
  )
}
