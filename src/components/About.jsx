import { useEffect, useRef } from 'react'
import Icon from './Icon'
import Reveal from './Reveal'
import { profile } from '../data/profile'
import { skillCategories } from '../data/skills'
import { projects } from '../data/projects'
import { isPlaceholder } from '../utils/isPlaceholder'

const HIGHLIGHTS = [
  { value: String(projects.length), label: 'Featured projects' },
  { value: String(skillCategories.length), label: 'Skill areas' },
  { value: 'IT', label: 'B.Tech branch' },
]

export default function About() {
  const eduInstitution = isPlaceholder(profile.education.institution) ? null : profile.education.institution
  const eduDuration = isPlaceholder(profile.education.duration) ? null : profile.education.duration
  const eduMeta = [eduInstitution, eduDuration].filter(Boolean).join(' · ')

  const sectionRef = useRef(null)

  // Very subtle scroll parallax on the stat/education column — a couple of
  // px of drift as the section scrolls through view. Skipped for
  // prefers-reduced-motion and disabled on the mobile layout (where the
  // column isn't sticky/side-by-side anyway). Reveal isn't ref-forwarding,
  // so the target node is grabbed with a plain querySelector off the
  // section ref instead of threading a ref through it.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    const side = section?.querySelector('.about-side')
    if (!section || !side) return

    let ticking = false

    function update() {
      ticking = false
      // Don't touch the transform until Reveal has finished animating it in
      // — otherwise this would fight the CSS slide-in on first scroll.
      if (window.innerWidth <= 860 || !side.classList.contains('reveal-visible')) {
        side.style.transform = ''
        return
      }
      const rect = section.getBoundingClientRect()
      const progress = 1 - Math.min(Math.max((rect.top + rect.height / 2) / window.innerHeight, 0), 1)
      const offset = (progress - 0.5) * 24
      side.style.transform = `translateY(${offset}px)`
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        <Reveal className="section-header">
          <p className="section-eyebrow">About Me</p>
          <h2 className="section-heading">Who I Am</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-side">
            <div className="about-stat-list">
              {HIGHLIGHTS.map((h) => (
                <div className="about-stat card" key={h.label}>
                  <div className="about-stat-value">{h.value}</div>
                  <div className="about-stat-label">{h.label}</div>
                </div>
              ))}
            </div>

            <div className="about-edu card">
              <div className="about-edu-icon">
                <Icon name="chip" size={18} />
              </div>
              <div>
                <strong>{profile.education.degree}</strong>
                {eduMeta && <p className="about-edu-meta">{eduMeta}</p>}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="about-body">
            {profile.intro.map((para) => (
              <p key={para} className="about-para">
                {para}
              </p>
            ))}

            <p className="about-list-label">What I focus on</p>
            <div className="about-interests">
              {profile.interests.map((interest) => (
                <span key={interest} className="tag">
                  {interest}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
