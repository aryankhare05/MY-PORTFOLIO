import { useState } from 'react'
import Icon from './Icon'
import Reveal from './Reveal'
import { links } from '../data/links'
import { isPlaceholder } from '../utils/isPlaceholder'
import emailjs from "@emailjs/browser";

const CONTACT_ROWS = [
  { key: 'email', label: links.email, icon: 'mail', href: !isPlaceholder(links.email) ? `mailto:${links.email}` : null },
  { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: !isPlaceholder(links.linkedin) ? links.linkedin : null },
  { key: 'github', label: 'GitHub', icon: 'github', href: !isPlaceholder(links.github) ? links.github : null },
  { key: 'leetcode', label: 'LeetCode', icon: 'leetcode', href: !isPlaceholder(links.leetcode) ? links.leetcode : null },
].filter((row) => row.href)

export default function Contact() {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }
// emailjs functionality enabling
  async function handleSubmit(e) {

    e.preventDefault()

    try {

        await emailjs.send(

             import.meta.env.VITE_EMAILJS_SERVICE_ID,

            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,

            {
                name: form.name,
                email: form.email,
                message: form.message
            },

            import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        )

        setStatus("✅ Message sent successfully!")

        setForm({
            name:"",
            email:"",
            message:""
        })

    }

    catch(error){

        setStatus("❌ Failed to send message.")

        console.log(error)

    }

}

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Reveal className="section-header contact-header">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-heading">Let&apos;s work together</h2>
          <p className="section-lede">
            Have a role, project, or question in mind? Reach out — I'd love to hear from you.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-links">
            {CONTACT_ROWS.map((row) => (
              <a key={row.key} className="contact-link card" href={row.href} target="_blank" rel="noreferrer">
                <span className="contact-link-icon">
                  <Icon name={row.icon} size={17} />
                </span>
                <span>{row.label}</span>
              </a>
            ))}
            {CONTACT_ROWS.length === 0 && (
              <p className="section-lede" style={{ marginBottom: 0 }}>
                Contact details will appear here once added to the project's data files.
              </p>
            )}
          </Reveal>

          <Reveal delay={100} className="contact-form-card card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" type="text" required value={form.name} onChange={handleChange('name')} />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" required value={form.message} onChange={handleChange('message')} />
              </div>
              <button type="submit" className="btn btn-primary">
                <Icon name="send" size={15} />
                Send Message
              </button>
              <p className="form-note">
                I'll usually reply within 24 hours.
              </p>
              {status && <p className="form-status">{status}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
