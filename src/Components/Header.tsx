import { useState, useEffect } from 'react'
import type { JSX } from 'react'
import './Header.css'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Inicio',     href: '#inicio'     },
  { label: 'Equipo',     href: '#equipo'     },
  { label: 'Contenido',  href: '#contenido'  },
  { label: 'Académico',  href: '#academico'  },
]

const DRIVE_URL = '#'

const Header = (): JSX.Element => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">

        <a href="#inicio" className="header__logo">
          <span className="header__logo-icon">⬡</span>
          <span className="header__logo-text">
            GobTI<span className="header__logo-accent"> · ESCOM</span>
          </span>
        </a>

        <nav className="header__nav">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} className="header__nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="header__github-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM14 8V3.5L18.5 8H14z" />
          </svg>
          Drive
        </a>

        <button
          className={`header__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Abrir menú"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="header__mobile-menu">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="header__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="header__mobile-link header__mobile-link--github"
          >
            ⬡ Drive del proyecto
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
