import Reveal from './Reveal'
import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <Reveal className="section-header">
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-heading">Technologies I work with</h2>
          <p className="section-lede">
            Languages, frameworks, and tools I currently use — organized by area rather than
            inflated with fake proficiency scores.
          </p>
        </Reveal>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <Reveal as="div" delay={i * 60} className="skills-card card tilt-card" key={cat.id}>
              <p className="skills-card-title">{cat.label}</p>
              <div className="skills-badges">
                {cat.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
