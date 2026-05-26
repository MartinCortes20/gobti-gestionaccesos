import './Herosection.css'
import type { JSX } from 'react'

interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: 'ISO',   label: '27001:2022'         },
  { value: 'COBIT', label: 'Gobierno de TI'     },
  { value: 'ITIL',  label: 'Cédula de servicio' },
  { value: '7CV4',  label: 'ESCOM · IPN'        },
]

const DRIVE_URL = '#'

const HeroSection = (): JSX.Element => {
  return (
    <section id="inicio" className="hero">
      <div className="hero__grid-overlay" />

      <div className="container hero__inner">

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span className="mono">Proyecto Final · Gobierno de TI · 7CV4</span>
        </div>

        <h1 className="hero__title">
          <span className="gradient-text">Gestión de Accesos</span>
          <br />
          <span className="hero__title-sub">a sistemas y correo institucional</span>
          <br />
          <span className="hero__title-mcp">ID-ACCESO-001</span>
        </h1>

        <p className="hero__subtitle">
          Servicio de TI diseñado bajo{' '}
          <span className="mono hero__inline-code">ISO/IEC 27001:2022</span>,{' '}
          <span className="mono hero__inline-code">COBIT</span> e{' '}
          <span className="mono hero__inline-code">ITIL</span> para controlar
          de forma segura el ciclo de vida de identidades y accesos a sistemas
          y correo electrónico organizacional. Proyecto académico de la
          Escuela Superior de Cómputo del Instituto Politécnico Nacional.
        </p>

        <div className="hero__ctas">
          <a
            href="#contenido"
            className="hero__btn hero__btn--primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Ver índice del proyecto
          </a>
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--secondary"
          >
            Documentación completa →
          </a>
        </div>

        <div className="hero__stats">
          {STATS.map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="mono">scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default HeroSection
