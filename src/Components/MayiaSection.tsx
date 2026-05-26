import { useEffect, useRef } from 'react'
import './MayiaSection.css'
import type { JSX } from 'react'

interface Pillar {
  icon: string
  label: string
  desc: string
}

interface FooterLink {
  label: string
  href: string
}

const PILLARS: Pillar[] = [
  { icon: '⬡', label: 'IPN',   desc: 'Instituto Politécnico Nacional' },
  { icon: '◈', label: 'ESCOM', desc: 'Escuela Superior de Cómputo'   },
  { icon: '◆', label: '7CV4',  desc: 'Gobierno de TI'                },
]

const DRIVE_URL = '#'

const FOOTER_LINKS: FooterLink[] = [
  { label: 'IPN',    href: 'https://www.ipn.mx/'                    },
  { label: 'ESCOM',  href: 'https://www.escom.ipn.mx/'              },
  { label: 'Drive',  href: DRIVE_URL                                },
]

const PROJECT_CARD = `{
  "materia":    "Gobierno de TI",
  "profesor":   "Palacios Solano Rocío",
  "grupo":      "7CV4",
  "institucion":"IPN · ESCOM",
  "servicio":   "Gestión de Accesos",
  "id":         "ID-ACCESO-001",
  "inicio":     "17-Mar-2026",
  "fin":        "12-Jun-2026",
  "marcos":     ["ISO 27001:2022", "COBIT", "ITIL"],
  "estado":     "en desarrollo"
}`

const MayiaSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <section id="academico" className="mayia" ref={sectionRef}>
        <div className="mayia__grid-lines" />
        <div className="container mayia__inner">

          <div className="mayia__copy">
            <span className="mayia__eyebrow mono">// Contexto académico</span>
            <h2 className="mayia__title">
              <span className="gradient-text">ESCOM</span> · IPN
            </h2>

            <p className="mayia__desc">
              Proyecto final de la materia{' '}
              <strong>Gobierno de TI</strong> impartida por la profesora{' '}
              <strong>Palacios Solano Rocío</strong> en la{' '}
              <a
                href="https://www.escom.ipn.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="mayia__link"
              >
                Escuela Superior de Cómputo
              </a>{' '}
              del Instituto Politécnico Nacional, grupo <strong>7CV4</strong>.
            </p>

            <p className="mayia__desc">
              El servicio diseñado <strong>ID-ACCESO-001</strong> integra marcos
              de referencia internacionales —<strong>COBIT</strong> para gobierno
              y metas de TI, <strong>ITIL</strong> para gestión del servicio,
              e <strong>ISO/IEC 27001:2022</strong> para seguridad de la
              información— en un modelo aplicable a organizaciones reales.
            </p>

            <div className="mayia__pillars">
              {PILLARS.map(p => (
                <div key={p.label} className="mayia__pillar">
                  <span className="mayia__pillar-icon">{p.icon}</span>
                  <div>
                    <div className="mayia__pillar-label">{p.label}</div>
                    <div className="mayia__pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mayia__cta"
            >
              Abrir Drive del proyecto →
            </a>
          </div>

          <div className="mayia__visual">
            <div className="mayia__card">
              <div className="mayia__card-header mono">
                <span className="mayia__card-dot mayia__card-dot--r" />
                <span className="mayia__card-dot mayia__card-dot--y" />
                <span className="mayia__card-dot mayia__card-dot--g" />
                <span>proyecto_final.json</span>
              </div>
              <div className="mayia__card-body">
                <pre className="mayia__code">{PROJECT_CARD}</pre>
              </div>
            </div>

            <div className="mayia__badge mayia__badge--1">ISO</div>
            <div className="mayia__badge mayia__badge--2">COBIT</div>
            <div className="mayia__badge mayia__badge--3">ITIL</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__logo">
            <span className="footer__logo-icon">⬡</span>
            <span className="mono">
              GobTI<span style={{ color: 'var(--claude-coral)' }}>·ESCOM</span>
            </span>
          </div>

          <p className="footer__copy mono">
            © {new Date().getFullYear()} · Gobierno de TI · 7CV4 · ESCOM IPN
          </p>

          <nav className="footer__links" aria-label="Footer links">
            {FOOTER_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}

export default MayiaSection
