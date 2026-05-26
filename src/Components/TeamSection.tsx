import { useEffect, useRef } from 'react'
import './TeamSection.css'
import type { JSX } from 'react'

interface TeamMember {
  name: string
  role: string
  school: string
  initials: string
  color: string
  bio: string
  tags: string[]
  icon: string
}

const TEAM: TeamMember[] = [
  {
    name: 'Martín Francisco Cortes Buendía',
    role: 'Administrador del Servicio',
    school: 'ESCOM · IPN · 7CV4',
    initials: 'MC',
    color: '#A855F7',
    bio: 'Coordinación general del proyecto. Responsable del diseño de procesos de gestión de accesos, toma de decisiones técnicas y arquitectura del servicio bajo el marco ISO/IEC 27001:2022.',
    tags: ['Coordinación', 'Arquitectura', 'COBIT'],
    icon: '⬡',
  },
  {
    name: 'Ana Guadalupe Ortiz González',
    role: 'Analista de Seguridad',
    school: 'ESCOM · IPN · 7CV4',
    initials: 'AO',
    color: '#C084FC',
    bio: 'Evaluación de riesgos del servicio, alineación con ISO/IEC 27001:2022 y diseño de la matriz de riesgos CID. Revisión de controles de mitigación y trazabilidad de accesos.',
    tags: ['ISO 27001', 'Riesgos', 'CID'],
    icon: '◈',
  },
  {
    name: 'Serge Eduardo Martínez Ramírez',
    role: 'Documentador Técnico',
    school: 'ESCOM · IPN · 7CV4',
    initials: 'SM',
    color: '#DDD6FE',
    bio: 'Redacción y estructuración de la documentación del servicio. Elaboración del glosario técnico, cédula ITIL e integración del entregable final.',
    tags: ['ITIL', 'Documentación', 'Glosario'],
    icon: '◆',
  },
]

interface MemberCardProps {
  member: TeamMember
  idx: number
}

const MemberCard = ({ member, idx }: MemberCardProps): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const style = {
    '--delay':  `${idx * 0.12}s`,
    '--accent': member.color,
  } as React.CSSProperties

  return (
    <div ref={cardRef} className="member-card" style={style}>

      <div className="member-card__avatar">
        <div className="member-card__avatar-ring" />
        <div className="member-card__avatar-inner">
          <span className="member-card__avatar-icon">{member.icon}</span>
          <span className="member-card__initials">{member.initials}</span>
        </div>
        <div className="member-card__avatar-glow" />
      </div>

      <div className="member-card__info">
        <div className="member-card__school mono">{member.school}</div>
        <h3 className="member-card__name">{member.name}</h3>
        <p className="member-card__role">{member.role}</p>
        <p className="member-card__bio">{member.bio}</p>
        <div className="member-card__tags">
          {member.tags.map(tag => (
            <span key={tag} className="member-card__tag mono">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const TeamSection = (): JSX.Element => {
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="equipo" className="team">
      <div className="team__bg-accent" />
      <div className="container">

        <div ref={headRef} className="team__header reveal-up">
          <span className="team__eyebrow mono">// El equipo</span>
          <h2 className="team__title">Quiénes somos</h2>
          <p className="team__subtitle">
            Estudiantes de la Escuela Superior de Cómputo del IPN, grupo 7CV4, presentando
            el proyecto final de la materia <strong>Gobierno de TI</strong> bajo la dirección
            de la profesora <strong>Palacios Solano Rocío</strong>.
          </p>
        </div>

        <div className="team__grid">
          {TEAM.map((member, i) => (
            <MemberCard key={member.name} member={member} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
