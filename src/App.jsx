import React, { useEffect, useRef, useState } from 'react'
import Prisms from './Prisms.jsx'
import Cursor from './Cursor.jsx'
import ParticleGrid from './ParticleGrid.jsx'
import { useReveal, useMagnetic, useClock, prefersReducedMotion } from './hooks.js'
import {
  profile, philosophy, project, concepts, skills, timeline, courses, designs,
} from './data.js'

/* ───────────── small building blocks ───────────── */

function Magnetic({ as: Tag = 'a', className = '', children, ...rest }) {
  const ref = useMagnetic(0.3)
  return (
    <Tag ref={ref} className={`btn ${className}`} {...rest}>
      <span>{children}</span>
    </Tag>
  )
}

function Letters({ text, base = 0 }) {
  return (
    <span className="letters" aria-label={text}>
      {text.split('').map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="letter"
          style={{ animationDelay: `${base + i * 55}ms` }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  )
}

function SectionHead({ index, label, title }) {
  return (
    <header className="section-head reveal">
      <span className="eyebrow">
        <i>{index}</i> {label}
      </span>
      <h2>{title}</h2>
    </header>
  )
}

function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="modal-back" onMouseDown={onClose} role="presentation">
      <div
        className={`modal glass ${wide ? 'wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close dialog">✕</button>
        {children}
      </div>
    </div>
  )
}

/* ───────────── nav ───────────── */

function Nav({ onResume }) {
  const links = [
    ['about', 'About'], ['work', 'Work'], ['design', 'Design'], ['skills', 'Skills'], ['path', 'Path'], ['contact', 'Contact'],
  ]
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="logo" aria-label="Janvi Movaliya, home">JM<b>.</b></a>
      <ul>
        {links.map(([id, l]) => (
          <li key={id}><a href={`#${id}`}>{l}</a></li>
        ))}
        <li><button className="nav-resume" onClick={onResume}>Résumé</button></li>
      </ul>
    </nav>
  )
}

/* ───────────── sound toggle ───────────── */

function SoundToggle() {
  const [on, setOn] = useState(false)
  const audio = useRef(null)

  const start = () => {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    const oscs = [174.61, 261.63, 329.63].map((f, i) => {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.value = 0.05 / (i + 1)
      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.08 + i * 0.05
      const lg = ctx.createGain()
      lg.gain.value = 0.02
      lfo.connect(lg).connect(g.gain)
      o.connect(g).connect(master)
      o.start()
      lfo.start()
      return [o, lfo]
    })
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 2)
    audio.current = { ctx, master, oscs }
  }
  const stop = () => {
    const a = audio.current
    if (!a) return
    a.master.gain.linearRampToValueAtTime(0, a.ctx.currentTime + 0.6)
    setTimeout(() => {
      a.oscs.flat().forEach((o) => o.stop())
      a.ctx.close()
    }, 700)
    audio.current = null
  }
  useEffect(() => () => stop(), [])

  const toggle = () => {
    if (on) stop()
    else start()
    setOn(!on)
  }

  return (
    <button className={`sound ${on ? 'on' : ''}`} onClick={toggle} aria-pressed={on} aria-label="Toggle ambient sound">
      <span className="bars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}
      </span>
      <span>Ambient {on ? 'on' : 'off'}</span>
    </button>
  )
}

/* ───────────── hero ───────────── */

function Hero() {
  const time = useClock()
  const [first, last] = profile.name.split(' ')
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <i className="aurora a1" /><i className="aurora a2" /><i className="aurora a3" />
        <div className="hero-grid" />
        {profile.heroImage && <img src={profile.heroImage} alt="" />}
      </div>
      <Prisms />
      <div className="hero-inner">
        <div className="status-tag reveal">
          <span className="pulse" /> {profile.status} <em>•</em> {profile.locationLabel}
        </div>
        <h1>
          <Letters text={first} base={200} />
          <br />
          <Letters text={last} base={200 + first.length * 55 + 120} />
        </h1>
        <p className="hero-role reveal">
          {profile.role} <span>/</span> {profile.secondaryRole}
        </p>
        <p className="hero-tag reveal">{profile.tagline}</p>
        <div className="cta-row reveal">
          <Magnetic href="#work" className="primary">Explore Selected Work</Magnetic>
          <Magnetic href="#contact" className="ghost">Get in Touch</Magnetic>
        </div>
      </div>
      <div className="readout glass" aria-label="Status readout">
        <div><small>LOC</small>{profile.coords}</div>
        <div><small>LOCAL</small>{time} IST</div>
        <div><small>STACK</small>React · Next.js · TS</div>
        <SoundToggle />
      </div>
      <div className="scroll-cue" aria-hidden="true"><i /> scroll</div>
    </section>
  )
}

/* ───────────── about ───────────── */

function About() {
  const time = useClock()
  const [active, setActive] = useState(null)
  return (
    <section className="section about" id="about">
      <SectionHead index="01" label="About" title="Interfaces that feel fluid and alive." />
      <div className="about-grid">
        <p className="about-text reveal">{profile.about}</p>
        <aside className="about-side reveal">
          <div className="glass clock-card">
            <small>LIVE · SURAT, INDIA</small>
            <strong>{time}</strong>
            <span>UTC+5:30</span>
          </div>
          <h3>Technical philosophy</h3>
          <div className="pills">
            {philosophy.map((p) => (
              <button
                key={p}
                className={`pill ${active === p ? 'active' : ''}`}
                onClick={() => setActive(active === p ? null : p)}
                aria-pressed={active === p}
              >
                {p}
              </button>
            ))}
          </div>
        </aside>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              REACT.JS ✦ NEXT.JS ✦ TYPESCRIPT ✦ UI/UX ✦ FIGMA ✦ MICRO-INTERACTIONS ✦ RESPONSIVE ✦&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── projects ───────────── */

const nextHireScreens = [
  { tab: 'HR Dashboard',      src: '/hr.jpeg',          alt: 'Next Hire – HR Dashboard' },
  { tab: 'Candidate Portal',  src: '/candidate.jpeg',   alt: 'Next Hire – Candidate Portal' },
  { tab: 'Interviewer View',  src: '/interviewer.jpeg', alt: 'Next Hire – Interviewer View' },
]

function NextHireCard() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const card = useRef(null)

  const onMove = (e) => {
    if (prefersReducedMotion()) return
    const el = card.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${px * 10}deg) rotateX(${-py * 8}deg)`
  }
  const onLeave = () => (card.current.style.transform = '')

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % nextHireScreens.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + nextHireScreens.length) % nextHireScreens.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox])

  const current = nextHireScreens[active]

  return (
    <>
      <div className="tilt-wrap" onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="tilt glass nh-card" ref={card}>
          {/* browser bar */}
          <div className="mock-bar">
            <i /><i /><i />
            <span>nexthire.app / {current.tab.toLowerCase().replace(' ', '-')}</span>
          </div>

          {/* tab switcher */}
          <div className="mock-tabs" role="tablist">
            {nextHireScreens.map((s, i) => (
              <button
                key={s.tab}
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'on' : ''}
                onClick={() => setActive(i)}
              >
                {s.tab}
              </button>
            ))}
          </div>

          {/* real screenshot — click to fullscreen */}
          <button
            className="nh-img-wrap"
            onClick={() => setLightbox(true)}
            aria-label={`View ${current.tab} fullscreen`}
            title="Click to view fullscreen"
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="nh-img"
              loading="lazy"
            />
            <div className="nh-zoom-hint" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              Fullscreen
            </div>
          </button>

          {/* thumbnail strip */}
          <div className="nh-strip">
            {nextHireScreens.map((s, i) => (
              <button
                key={i}
                className={`nh-thumb ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={s.tab}
              >
                <img src={s.src} alt={s.tab} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* fullscreen lightbox */}
      {lightbox && (
        <div className="lb-back" onMouseDown={() => setLightbox(false)} role="presentation">
          <div className="lb-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="lb-header">
              <div className="lb-header-left">
                <span className="lb-tag">Next Hire</span>
                <strong className="lb-title">{current.tab}</strong>
              </div>
              <div className="lb-header-right">
                <span className="lb-count">{active + 1} / {nextHireScreens.length}</span>
                <button className="lb-close" onClick={() => setLightbox(false)} aria-label="Close">✕</button>
              </div>
            </div>
            <div className="lb-img-wrap">
              <button className="lb-arrow left" onClick={() => setActive((i) => (i - 1 + nextHireScreens.length) % nextHireScreens.length)} aria-label="Previous">‹</button>
              <img key={current.src} src={current.src} alt={current.alt} className="lb-img" />
              <button className="lb-arrow right" onClick={() => setActive((i) => (i + 1) % nextHireScreens.length)} aria-label="Next">›</button>
            </div>
            <div className="lb-strip">
              {nextHireScreens.map((s, i) => (
                <button key={i} className={`lb-thumb ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} aria-label={s.tab}>
                  <img src={s.src} alt={s.tab} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Projects() {
  return (
    <section className="section" id="work">
      <SectionHead index="02" label="Selected Work" title="Flagship case study." />
      <article className="case">
        <div className="case-copy reveal">
          <div className="case-meta"><span>Case 01</span><span>{project.period}</span></div>
          <h3>{project.title}</h3>
          <p className="case-sub">{project.subtitle}</p>
          <h4>Objective</h4>
          <p>{project.objective}</p>
          <h4>Tech stack</h4>
          <ul className="chips">
            {project.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <div className="cta-row">
            {project.demoUrl ? (
              <Magnetic href={project.demoUrl} target="_blank" rel="noreferrer" className="primary">Live demo ↗</Magnetic>
            ) : (
              <Magnetic as="span" className="ghost disabled" aria-disabled="true">Live demo — coming soon</Magnetic>
            )}
            <Magnetic href={project.repoUrl} target="_blank" rel="noreferrer" className="ghost">GitHub ↗</Magnetic>
          </div>
        </div>
        <div className="reveal"><NextHireCard /></div>
      </article>

      <div className="concepts">
        {concepts.map((c) => (
          <div className="concept reveal" key={c.code} data-hover>
            <div className="scan" aria-hidden="true" />
            <small>{c.code} · CONCEPT LAB</small>
            <h3>{c.title}</h3>
            <p>{c.blurb}</p>
            <span className="status"><i /> In development</span>
          </div>
        ))}
      </div>
    </section>
  )
}


/* ───────────── design lab (Figma folder gallery) ───────────── */

function DesignLightbox({ design, onClose }) {
  const [idx, setIdx] = useState(0)
  const total = design.images.length

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % total)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  const current = design.images[idx]

  return (
    <div className="lb-back" onMouseDown={onClose} role="presentation">
      <div className="lb-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={design.title}>
        <div className="lb-header">
          <div className="lb-header-left">
            <span className="lb-tag">{design.tag}</span>
            <strong className="lb-title">{design.title}</strong>
            <span className="lb-sub">{current.label}</span>
          </div>
          <div className="lb-header-right">
            <span className="lb-count">{idx + 1} / {total}</span>
            <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        <div className="lb-img-wrap">
          {total > 1 && (
            <button className="lb-arrow left" onClick={() => setIdx((i) => (i - 1 + total) % total)} aria-label="Previous">‹</button>
          )}
          <img key={current.src} src={current.src} alt={current.label} className="lb-img" loading="lazy" />
          {total > 1 && (
            <button className="lb-arrow right" onClick={() => setIdx((i) => (i + 1) % total)} aria-label="Next">›</button>
          )}
        </div>

        {total > 1 && (
          <div className="lb-strip">
            {design.images.map((img, i) => (
              <button
                key={i}
                className={`lb-thumb ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={img.label}
                aria-pressed={i === idx}
              >
                <img src={img.src} alt={img.label} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DesignLab() {
  const [active, setActive] = useState(null)
  return (
    <section className="section" id="design">
      <SectionHead index="03" label="Design Lab" title="UI/UX, straight from Figma." />
      <p className="lede reveal">
        Explore the interface designs — click any folder to view all screens inside.
      </p>

      <div className="design-folders">
        {designs.map((d) => (
          <button
            key={d.id}
            className="dfolder glass reveal"
            onClick={() => setActive(d)}
            aria-label={`Open ${d.title}`}
          >
            <div className="dfolder-tab">
              <span className="dtag">{d.tag}</span>
            </div>
            <div className="dfolder-cover">
              <img src={d.cover} alt={d.title} loading="lazy" />
              <div className="dfolder-overlay">
                <span className="dfolder-open-hint">View designs ↗</span>
              </div>
            </div>
            <div className="dfolder-info">
              <div className="dfolder-icon" aria-hidden="true">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                  <path d="M1 3.5C1 2.67 1.67 2 2.5 2H6.5L8.5 4H15.5C16.33 4 17 4.67 17 5.5V12.5C17 13.33 16.33 14 15.5 14H2.5C1.67 14 1 13.33 1 12.5V3.5Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
              </div>
              <div className="dfolder-text">
                <strong>{d.title}</strong>
                <span>{d.note}</span>
              </div>
              <div className="dfolder-count">{d.images.length} {d.images.length === 1 ? 'screen' : 'screens'}</div>
            </div>
          </button>
        ))}
      </div>

      {active && <DesignLightbox design={active} onClose={() => setActive(null)} />}
    </section>
  )
}

/* ───────────── skills ───────────── */

function Skills() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section skills" id="skills">
      <ParticleGrid />
      <SectionHead index="04" label="Skills Matrix" title="The toolkit." />
      <p className="lede reveal">
        Hover or tap a skill to read its telemetry. Levels are self-assessed comfort ratings.
      </p>
      <div className="matrix">
        {skills.map((cat) => (
          <div className="cat glass reveal" key={cat.id}>
            <h3>{cat.title}</h3>
            <ul>
              {cat.items.map((it) => {
                const key = `${cat.id}-${it.name}`
                const isOpen = open === key
                return (
                  <li key={key}>
                    <button
                      className={`skill ${isOpen ? 'open' : ''}`}
                      onMouseEnter={() => setOpen(key)}
                      onMouseLeave={() => setOpen(null)}
                      onFocus={() => setOpen(key)}
                      onBlur={() => setOpen(null)}
                      onClick={() => setOpen(isOpen ? null : key)}
                      aria-expanded={isOpen}
                    >
                      <span className="skill-name">{it.name}</span>
                      <span className="skill-val">{isOpen ? `${it.level}%` : '—'}</span>
                      <span className="meter"><i style={{ width: isOpen ? `${it.level}%` : '0%' }} /></span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────────── education timeline ───────────── */

function Path() {
  return (
    <section className="section" id="path">
      <SectionHead index="05" label="Path" title="Education, internship & courses." />
      <div className="path-grid">
        <ol className="timeline">
          {timeline.map((t) => (
            <li className="reveal" key={t.title}>
              <span className="dot" />
              <small>{t.kind} · {t.period}</small>
              <h3>{t.title}</h3>
              <p>{t.org}{t.place ? ` — ${t.place}` : ''}</p>
            </li>
          ))}
        </ol>
        <div className="courses glass reveal">
          <h3>Certifications & courses</h3>
          <ul>
            {courses.map((c) => (
              <li key={c.title}>
                <div><strong>{c.title}</strong><span>{c.org}</span></div>
                <em>{c.year}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────── contact (static) ───────────── */

function Contact({ onResume }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const t = document.createElement('textarea')
      t.value = profile.email
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="section contact" id="contact">
      <SectionHead index="06" label="Contact" title="Let’s build something." />
      <div className="terminal glass reveal">
        <div className="term-bar"><i /><i /><i /><span>janvi@portfolio ~ dossier</span></div>
        <dl>
          <div><dt>name</dt><dd>Janvi Movaliya</dd></div>
          <div><dt>role</dt><dd>{profile.role} · {profile.secondaryRole}</dd></div>
          <div>
            <dt>email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button className="copy" onClick={copy}>{copied ? 'copied ✓' : 'copy'}</button>
            </dd>
          </div>
          <div><dt>phone</dt><dd><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></dd></div>
          <div><dt>location</dt><dd>{profile.location}</dd></div>
          <div><dt>github</dt><dd><a href={profile.github} target="_blank" rel="noreferrer">{profile.githubLabel}</a></dd></div>
        </dl>
        <div className="cta-row">
          <Magnetic href={`mailto:${profile.email}`} className="primary">Email me</Magnetic>
          <Magnetic as="button" className="ghost" onClick={onResume}>View résumé</Magnetic>
          <Magnetic href="/resume.pdf" download="Janvi_Movaliya_Resume.pdf" className="ghost">Download PDF</Magnetic>
        </div>
      </div>
    </section>
  )
}

/* ───────────── app ───────────── */

export default function App() {
  const [resume, setResume] = useState(false)
  useReveal()
  const openResume = () => setResume(true)

  return (
    <>
      <Cursor />
      <div className="noise" aria-hidden="true" />
      <Nav onResume={openResume} />
      <main>
        <Hero />
        <About />
        <Projects />
        <DesignLab />
        <Skills />
        <Path />
        <Contact onResume={openResume} />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Janvi Movaliya</span>
        <span>Surat, India · Built with React & Three.js</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      <Modal open={resume} onClose={() => setResume(false)} title="Résumé" wide>
        <div className="resume-view">
          <iframe src="/resume.pdf" title="Janvi Movaliya résumé" />
          <a className="btn primary" href="/resume.pdf" download="Janvi_Movaliya_Resume.pdf"><span>Download PDF</span></a>
        </div>
      </Modal>
    </>
  )
}
