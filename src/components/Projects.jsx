import Icon from './Icon'
import Reveal from './Reveal'
import { projects } from '../data/projects'
import { isPlaceholder } from '../utils/isPlaceholder'

function ProjectCard({ project, index }) {
  const realFeatures = project.features.filter((f) => !isPlaceholder(f))
  const hasGithub = !isPlaceholder(project.githubUrl)
  const hasLive = !isPlaceholder(project.liveUrl)
  const [firstShot] = project.screenshots

  return (
    <Reveal as="article" delay={index * 80} className="project-card card tilt-card">
      <div className="project-media">
        {firstShot ? (
          <img src={firstShot} alt={`${project.name} screenshot`} />
        ) : (
          <div className="project-media-fallback">
            <Icon name="code" size={30} />
          </div>
        )}
      </div>

      <div className="project-body">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-tagline">{project.tagline}</p>

        <div className="project-tech-row">
          {project.technologies
            .filter((t) => !isPlaceholder(t))
            .map((t) => (
              <span key={t} className="tag project-tech-tag">
                {t}
              </span>
            ))}
        </div>

        {realFeatures.length > 0 && (
          <ul className="project-features">
            {realFeatures.slice(0, 4).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}

        {(hasGithub || hasLive) && (
          <div className="project-actions">
            {hasGithub && (
              <a className="btn btn-ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                <Icon name="github" size={15} />
                Code
              </a>
            )}
            {hasLive && (
              <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                <Icon name="external" size={15} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <Reveal className="section-header">
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-heading">Things I&apos;ve built</h2>
          <p className="section-lede">A few projects I've worked on across the stack.</p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard project={project} index={i} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
