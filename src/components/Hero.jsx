import Icon from './Icon'
import Reveal from './Reveal'
import HeroParticles from './HeroParticles'
import { profile } from '../data/profile'
import { links } from '../data/links'
import { isPlaceholder } from '../utils/isPlaceholder'

const SOCIAL_LINKS = [
  { key: 'github', icon: 'github', href: links.github, label: 'GitHub' },
  { key: 'linkedin', icon: 'linkedin', href: links.linkedin, label: 'LinkedIn' },
  { key: 'email', icon: 'mail', href: `mailto:${links.email}`, label: 'Email', gate: links.email },
  { key: 'leetcode', icon: 'leetcode', href: links.leetcode, label: 'leetcode' },
].filter((s) => !isPlaceholder(s.gate ?? s.href))

export default function Hero() {
  const hasResume = !isPlaceholder(links.resumeUrl)

  function goToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="hero">
      <HeroParticles />
      <div className="container hero-inner">
        <Reveal className="hero-text">
          <p className="section-eyebrow">Hello, I&apos;m</p>
          <h1 className="hero-name">
            {profile.name}
            <span className="hero-name-dot">.</span>
          </h1>
          <p className="hero-role">{profile.subtitle}</p>
          <p className="hero-desc">{profile.intro[0]}</p>

          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={goToProjects}>
              View My Work
              <Icon name="arrowRight" size={15} />
            </button>
            {hasResume && (
              <a className="btn btn-ghost" href={links.resumeUrl} target="_blank" rel="noreferrer">
                <Icon name="download" size={15} />
                Download Resume
              </a>
            )}
          </div>

          {SOCIAL_LINKS.length > 0 && (
            <div className="hero-socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  className="icon-btn"
                  href={s.href}
                  target={s.key === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={120} className="hero-photo-wrap">
          <div className="hero-photo-ring" aria-hidden="true" />
          <div className="hero-photo-spin-ring" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true">
            <span className="hero-orbit-dot hero-orbit-dot-1" />
            <span className="hero-orbit-dot hero-orbit-dot-2" />
            <span className="hero-orbit-dot hero-orbit-dot-3" />
          </div>
          <div className="hero-photo">
            {profile.photo ? (
              <img src={profile.photo} alt={`${profile.name}'s profile photo`} />
            ) : (
              <Icon name="user" size={64} />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
