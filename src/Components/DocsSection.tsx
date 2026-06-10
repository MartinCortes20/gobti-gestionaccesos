import { useState, useRef, useEffect } from 'react'
import './DocsSection.css'
import type { JSX } from 'react'

// ── Types ────────────────────────────────────────────────
type TabId =
  | 'introduccion'
  | 'objetivo'
  | 'descripcion'
  | 'mvv'
  | 'metas-corp'
  | 'metas-ti'
  | 'cascada'
  | 'mapa'
  | 'caso'
  | 'cedula'
  | 'arquitectura'
  | 'inventario'
  | 'matriz'
  | 'bia-tactico'
  | 'bia-operacional'
  | 'plan'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const TABS: Tab[] = [
  { id: 'introduccion',    label: 'Introducción',                  icon: '▦' },
  { id: 'objetivo',        label: 'Objetivo',                       icon: '◎' },
  { id: 'descripcion',     label: 'Descripción del Servicio',       icon: '▤' },
  { id: 'mvv',             label: 'Misión, Visión y Valores',       icon: '⬡' },
  { id: 'metas-corp',      label: 'Metas Corporativas',             icon: '◆' },
  { id: 'metas-ti',        label: 'Metas de TI',                    icon: '◇' },
  { id: 'cascada',         label: 'Cascada de Metas',               icon: '▼' },
  { id: 'mapa',            label: 'Mapa Estratégico',               icon: '▸' },
  { id: 'caso',            label: 'Factibilidad y Caso de Negocio', icon: '※' },
  { id: 'cedula',          label: 'Cédula de Servicio',             icon: '▥' },
  { id: 'arquitectura',    label: 'Arquitectura del Servicio',      icon: '⬢' },
  { id: 'inventario',      label: 'Inventario de Activos',          icon: '▪' },
  { id: 'matriz',          label: 'Matriz de Riesgos',              icon: '▲' },
  { id: 'bia-tactico',     label: 'BIA Táctico',                    icon: '◐' },
  { id: 'bia-operacional', label: 'BIA Operacional',                icon: '◑' },
  { id: 'plan',            label: 'Plan de Continuidad',            icon: '◯' },
]

const DRIVE_URL = 'https://drive.google.com/drive/folders/1BpBr4jUQ4n0VdSRXfwKs-vA83cf0y2aQ?usp=drive_link'

// ── Visor de PDFs (Google Drive) ─────────────────────────
// Pega el ID de cada PDF: es lo que va entre /d/ y /view del enlace de compartir.
// En Drive: clic derecho sobre el PDF → Compartir → "Cualquier persona con el enlace"
// → Copiar vínculo. De https://drive.google.com/file/d/AQUI_VA_EL_ID/view copia el ID.
const PDF_IDS: Partial<Record<TabId, string>> = {
  cedula:     '1Q2S1iwt1-FP93p-qbqbvHDveLxW87nHE', // CEDULA DE SERVICIO SEGUNDA PARTE (1).pdf
  matriz:     '1SSKJ2mtZ7XkEZ9PVYcuBqDXiA8IKXrof', // 5 Riesgos Gestion Accesos.pdf
  plan:       '1C4SQ3wDyJ3-6842vegx3TkxoWCeNlRZC', // Plan de Continuidad del Negocio.pdf
  caso:       '1vHzpZsnf-cUm5nXyTI4OXE_VFuFXlGNU', // casosnegocio.pdf
  'metas-corp': '10lCTN6CXzZ5exCL4N1pU8kzCFFUiJubW', // MetaCorporativasMapaEstrategico (1).pdf
  mapa:       '10lCTN6CXzZ5exCL4N1pU8kzCFFUiJubW', // MetaCorporativasMapaEstrategico (1).pdf
  'metas-ti': '1dK7aY707LBApe8_UYgaIkf9G0ISsgVDY', // metasTI.pdf
  cascada:    '199KI76ALqWuuiCiRCS3z7gNn78JT0BL8', // cascada de metas.pdf
  arquitectura: '13ejbg4qPHQMb03D7W5sYqGSBP76EnZrD', // diagrama de arquitectura.pdf
  inventario: '1r4rM6Umtt4eAvRoa5kQuBQ2JOK2LBeIy', // inventario de activos.pdf
  'bia-tactico':     '1ngtP3OO5RBQIMrR-ZPY8bwGAerMqrXOK', // BIA táctico.pdf
  'bia-operacional': '1Ryjvwwrx3DZOAPNTBoC-xR0JaNhzavrM', // BIA operacional.pdf
}

interface PdfEmbedProps {
  tabId?: TabId
  id?: string
  title: string
}
const PdfEmbed = ({ tabId, id: idProp, title }: PdfEmbedProps): JSX.Element | null => {
  const id = idProp ?? (tabId ? PDF_IDS[tabId] : undefined)
  if (!id) return null
  return (
    <div className="docs__pdf">
      <div className="docs__pdf-bar">
        <span className="docs__pdf-name mono">{title}</span>
        <div className="docs__pdf-actions">
          <a className="docs__pdf-link mono" href={`https://drive.google.com/file/d/${id}/view`} target="_blank" rel="noopener noreferrer">Abrir ↗</a>
          <a className="docs__pdf-link mono" href={`https://drive.google.com/uc?export=download&id=${id}`} target="_blank" rel="noopener noreferrer">Descargar ↓</a>
        </div>
      </div>
      <iframe className="docs__pdf-frame" src={`https://drive.google.com/file/d/${id}/preview`} title={title} />
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────
interface PendingCardProps {
  title: string
  description: string
  driveUrl?: string
}
const PendingCard = ({ title, description, driveUrl = DRIVE_URL }: PendingCardProps): JSX.Element => (
  <div className="docs__pending">
    <div className="docs__pending-tag mono">// Pendiente</div>
    <h4 className="docs__pending-title">{title}</h4>
    <p className="docs__pending-desc">{description}</p>
    <div className="docs__pending-body">
      <div className="docs__pending-qr">
        <div className="docs__pending-qr-box"><img src="/qrDrive.png" alt="QR carpeta de Drive" className="docs__qr-img" /></div>
        <span className="docs__pending-qr-label mono">Escanea para abrir</span>
      </div>
      <a
        href={driveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="docs__pending-cta mono"
      >
        Abrir en Drive →
      </a>
    </div>
  </div>
)

interface DeliverableProps {
  tag: string
  children: React.ReactNode
}
const Deliverable = ({ tag, children }: DeliverableProps): JSX.Element => (
  <div className="docs__deliverable">
    <div className="docs__deliverable-tag mono">// {tag}</div>
    {children}
  </div>
)

// ── Tab: Introducción ───────────────────────────────────
const TabIntroduccion = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Introducción</h3>
      <Deliverable tag="Introducción (1 cuartilla)">
        <p className="docs__p">
          Actualmente, muchas organizaciones dependen del correo electrónico y de sistemas
          digitales para su operación diaria. Sin embargo, cuando no existe una administración
          adecuada de accesos, se presentan problemas críticos como accesos no autorizados,
          permisos mal asignados, dificultad para auditar quién tiene acceso a la información,
          e incumplimiento de normativas de seguridad como ISO/IEC 27001.
        </p>
        <p className="docs__p">
          A nivel global, los incidentes de seguridad relacionados con la gestión inadecuada
          de identidades representan una de las principales causas de brechas de información.
          Según el marco de referencia <strong>ISO/IEC 27001:2022</strong>, el control de
          accesos es un dominio prioritario que exige políticas claras, procesos documentados
          y herramientas tecnológicas que garanticen que cada usuario tenga únicamente los
          privilegios necesarios para ejercer sus funciones.
        </p>
        <p className="docs__p">
          En el contexto académico de este proyecto, se identificó la necesidad de diseñar
          un servicio de gestión de accesos que sirva como modelo para organizaciones que
          requieren implementar controles de seguridad robustos sobre sus sistemas de correo
          institucional y plataformas digitales.
        </p>
      </Deliverable>
    </div>
  </div>
)

// ── Tab: Objetivo ───────────────────────────────────────
const TabObjetivo = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Objetivo del servicio</h3>
      <Deliverable tag="Objetivo">
        <p className="docs__p">
          Establecer un servicio que permita controlar de forma segura el acceso de los
          usuarios a los sistemas y al correo electrónico institucional, garantizando la
          protección de la información, el cumplimiento de normas de seguridad y la correcta
          administración de permisos.
        </p>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Alcance</h3>
      <Deliverable tag="Alcance del proyecto">
        <p className="docs__p">
          El proyecto contempla el diseño, documentación y planificación de un servicio de
          gestión de accesos para sistemas de correo institucional y plataformas digitales
          organizacionales. Compromisos del equipo:
        </p>
        <div className="docs__primitives">
          {[
            'Definición y documentación del proceso de creación de cuentas de usuario.',
            'Diseño del modelo de asignación de permisos basado en roles (RBAC).',
            'Documentación del procedimiento de revocación y desactivación de accesos.',
            'Evaluación de riesgos asociados al servicio con propuesta de mitigación.',
            'Diseño conceptual del flujo de auditoría y trazabilidad de accesos.',
          ].map((t, i) => (
            <div key={i} className="docs__primitive">
              <span className="docs__primitive-icon mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="docs__primitive-desc">{t}</div>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>
  </div>
)

// ── Tab: Descripción ────────────────────────────────────
const TabDescripcion = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Descripción del servicio</h3>
      <Deliverable tag="Descripción">
        <p className="docs__p">
          El servicio de gestión de accesos permite controlar de manera centralizada quién
          puede acceder a los sistemas o a la información de una organización. Mediante
          procesos estructurados como la creación de cuentas, asignación de permisos basados
          en roles y revocación oportuna de accesos, se garantiza que cada usuario tenga
          únicamente los privilegios necesarios.
        </p>
        <div className="docs__primitives">
          {[
            { icon: '◇', title: 'Mínimo privilegio',     desc: 'Cada usuario solo accede a los recursos estrictamente necesarios para su función.' },
            { icon: '◈', title: 'Separación de funciones', desc: 'Distinción entre usuarios con capacidad de administración y usuarios con acceso operativo.' },
            { icon: '◆', title: 'Trazabilidad y auditoría', desc: 'Registro de todas las acciones de creación, modificación y eliminación de accesos.' },
          ].map(p => (
            <div key={p.title} className="docs__primitive">
              <span className="docs__primitive-icon">{p.icon}</span>
              <div>
                <div className="docs__primitive-title mono">{p.title}</div>
                <div className="docs__primitive-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Beneficios esperados</h3>
      <Deliverable tag="Beneficios">
        <div className="docs__tech-grid">
          {[
            { tech: 'Seguridad',     role: 'Controles formales en acceso a sistemas',         color: 'coral' },
            { tech: 'Centralización', role: 'Elimina la gestión manual y dispersa',           color: 'coral' },
            { tech: 'Cumplimiento',   role: 'Alineado a ISO/IEC 27001:2022',                  color: 'peach' },
            { tech: 'Reducción riesgo', role: 'Menor acceso no autorizado y escalada',         color: 'peach' },
            { tech: 'Ciclo de vida',  role: 'Mejora administración de altas y bajas',         color: 'blue' },
            { tech: 'Tiempo respuesta', role: 'Reducción en altas y bajas de usuarios',         color: 'blue' },
          ].map(b => (
            <div key={b.tech} className={`docs__tech-badge docs__tech-badge--${b.color}`}>
              <span className="docs__tech-name mono">{b.tech}</span>
              <span className="docs__tech-role">{b.role}</span>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>
  </div>
)

// ── Tab: Misión, Visión y Valores ───────────────────────
const VALORES = [
  { icon: '◇', label: 'Seguridad',       desc: 'La protección de la información es la base de toda decisión técnica y operativa.' },
  { icon: '◈', label: 'Integridad',      desc: 'Actuamos con honestidad y transparencia frente a clientes, colaboradores y autoridades.' },
  { icon: '◆', label: 'Trazabilidad',    desc: 'Cada acción sobre los accesos queda registrada, auditada y disponible para revisión.' },
  { icon: '⬡', label: 'Mejora continua', desc: 'Revisamos y actualizamos nuestros procesos para responder a nuevas amenazas y normativas.' },
  { icon: '▸', label: 'Cumplimiento',    desc: 'Operamos siempre alineados a estándares internacionales (ISO/IEC 27001, NIST).' },
  { icon: '◉', label: 'Colaboración',    desc: 'Trabajamos en equipo con el cliente para diseñar soluciones a la medida de su contexto.' },
]

const TabMVV = (): JSX.Element => (
  <div className="docs__content">

    <div className="docs__section">
      <h3 className="docs__h3">Sobre la organización</h3>
      <Deliverable tag="Identidad corporativa">
        <p className="docs__p">
          <strong>Identitas MX</strong> es una firma mexicana especializada en{' '}
          <strong>gestión de identidades y accesos</strong> (IAM), enfocada en
          implementar controles de seguridad robustos sobre sistemas de correo
          institucional y plataformas digitales para organizaciones del sector
          público, privado y académico. Bajo este marco se diseña el servicio{' '}
          <span className="docs__inline-code mono">ID-ACCESO-001</span>.
        </p>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Misión</h3>
      <Deliverable tag="Misión">
        <p className="docs__p">
          Garantizar la <strong>confidencialidad, integridad y disponibilidad</strong>{' '}
          de la información de nuestros clientes mediante el diseño, implementación
          y operación de servicios de gestión de identidades y accesos alineados a
          los más altos estándares internacionales de seguridad de la información
          (<span className="docs__inline-code mono">ISO/IEC 27001:2022</span>),
          fomentando una cultura organizacional de cumplimiento, trazabilidad y
          mejora continua que proteja los activos digitales y reduzca el riesgo
          operacional.
        </p>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Visión</h3>
      <Deliverable tag="Visión">
        <p className="docs__p">
          Ser para el año <strong>2030</strong> el referente nacional en{' '}
          servicios de gestión de identidades y accesos del sector público,
          privado y académico mexicano, reconocidos por la <strong>calidad
          técnica</strong> de nuestras soluciones, la <strong>adaptabilidad</strong>{' '}
          de nuestros procesos a distintos contextos organizacionales y nuestro
          compromiso con la <strong>formación de talento</strong> especializado
          en ciberseguridad y gobierno de TI.
        </p>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Valores</h3>
      <Deliverable tag="Valores corporativos">
        <div className="docs__primitives">
          {VALORES.map(v => (
            <div key={v.label} className="docs__primitive">
              <span className="docs__primitive-icon">{v.icon}</span>
              <div>
                <div className="docs__primitive-title mono">{v.label}</div>
                <div className="docs__primitive-desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>

  </div>
)

// ── Tab: Metas Corporativas ─────────────────────────────
const TabMetasCorp = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Metas Corporativas (BSC)</h3>
      <p className="docs__p">
        Una meta corporativa por cada dimensión del <strong>Balanced Scorecard</strong>,
        mapeada con el catálogo COBIT.
      </p>
      <PdfEmbed tabId="metas-corp" title="Metas corporativas y mapa estratégico.pdf" />
      <PendingCard
        title="Metas corporativas — 1 por dimensión BSC"
        description="Tabla con las 4 metas corporativas (Financiera, Cliente, Procesos internos, Aprendizaje y crecimiento) alineadas al catálogo COBIT."
      />
    </div>
  </div>
)

// ── Tab: Metas de TI ────────────────────────────────────
const TabMetasTI = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Metas de TI (BSC)</h3>
      <p className="docs__p">
        Una meta de TI por cada dimensión del <strong>Balanced Scorecard</strong>,
        derivada de las metas corporativas y mapeada con el catálogo COBIT.
      </p>
      <PdfEmbed tabId="metas-ti" title="Metas de TI.pdf" />
      <PendingCard
        title="Metas de TI — 1 por dimensión BSC"
        description="Tabla con las 4 metas de TI (Financiera, Cliente, Procesos internos, Aprendizaje y crecimiento) alineadas al catálogo COBIT."
      />
    </div>
  </div>
)

// ── Tab: Cascada de Metas ───────────────────────────────
const TabCascada = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Cascada de Metas</h3>
      <p className="docs__p">
        Mapeo de relaciones <strong>primarias</strong> y <strong>secundarias</strong>{' '}
        entre metas corporativas y metas de TI, conforme al marco COBIT.
      </p>
      <PdfEmbed tabId="cascada" title="Cascada de metas.pdf" />
      <PendingCard
        title="Cascada de metas COBIT"
        description="Diagrama del mapeo de relaciones primarias y secundarias entre metas corporativas y metas de TI."
      />
    </div>
  </div>
)

// ── Tab: Mapa Estratégico ───────────────────────────────
const TabMapa = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Mapa Estratégico (BSC)</h3>
      <p className="docs__p">
        Mapa estratégico con <strong>una meta corporativa</strong> y{' '}
        <strong>una meta de TI</strong> seleccionadas, visualizando relaciones causa-efecto
        entre las cuatro dimensiones del Balanced Scorecard.
      </p>
      <PdfEmbed tabId="mapa" title="Metas corporativas y mapa estratégico.pdf" />
      <PendingCard
        title="Mapa estratégico"
        description="Mapa estratégico con 1 meta corporativa y 1 meta de TI seleccionadas, mostrando relaciones causa-efecto entre las dimensiones del BSC."
      />
    </div>
  </div>
)

// ── Tab: Factibilidad y Caso de Negocio ─────────────────
const TabCaso = (): JSX.Element => (
  <div className="docs__content">

    <div className="docs__section">
      <h3 className="docs__h3">Factibilidad y Caso de Negocio</h3>
      <p className="docs__p">
        Justificación económica y operacional del proyecto, incluyendo cronograma de
        alto nivel, personal involucrado, estudio de mercado y procedimiento de
        adquisición de la solución tecnológica.
      </p>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Cronograma de alto nivel</h3>
      <Deliverable tag="Cronograma">
        <div className="docs__layer-modules">
          {[
            { tarea: 'Análisis de requerimientos',           ini: '17-Mar', fin: '20-Mar', resp: 'Analista de Seguridad' },
            { tarea: 'Diseño del modelo RBAC',                ini: '23-Mar', fin: '13-Abr', resp: 'Administrador del Servicio' },
            { tarea: 'Documentación de procesos',             ini: '16-Abr', fin: '03-May', resp: 'Documentador Técnico' },
            { tarea: 'Evaluación de riesgos y controles',     ini: '06-May', fin: '24-May', resp: 'Analista de Seguridad' },
            { tarea: 'Definición de indicadores y métricas',  ini: '27-May', fin: '15-Jun', resp: 'Administrador del Servicio' },
            { tarea: 'Documento final e integración',         ini: '01-Jun', fin: '05-Jun', resp: 'Todo el equipo' },
            { tarea: 'Revisión, validación y entrega',        ini: '08-Jun', fin: '12-Jun', resp: 'Todo el equipo' },
          ].map((t, i) => (
            <div key={i} className="docs__layer-module">
              <span className="docs__layer-module-name mono">{t.ini} → {t.fin}</span>
              <span className="docs__layer-module-role"><strong>{t.tarea}</strong> · {t.resp}</span>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Personal involucrado</h3>
      <Deliverable tag="Equipo de trabajo">
        <div className="docs__primitives">
          {[
            { icon: '⬡', title: 'Administrador del Servicio (×1)', desc: 'Coordinación general, diseño de procesos, toma de decisiones técnicas.' },
            { icon: '◈', title: 'Analista de Seguridad (×1)',       desc: 'Evaluación de riesgos, alineación con ISO/IEC 27001, revisión de controles.' },
            { icon: '◆', title: 'Documentador Técnico (×1)',         desc: 'Redacción, estructuración del documento y elaboración del glosario.' },
          ].map(p => (
            <div key={p.title} className="docs__primitive">
              <span className="docs__primitive-icon">{p.icon}</span>
              <div>
                <div className="docs__primitive-title mono">{p.title}</div>
                <div className="docs__primitive-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Estudio de mercado</h3>
      <Deliverable tag="Estudio de mercado">
        <div className="docs__tech-grid">
          {[
            { tech: 'Microsoft Entra ID',  role: 'IAM nube · MFA · SSO · desde $6 USD/usuario/mes',  color: 'coral' },
            { tech: 'Okta Identity Cloud', role: 'IAM independiente · 7,000 apps · desde $2 USD/u/mes', color: 'peach' },
            { tech: 'Diseño académico',    role: 'Conceptual · ISO 27001 · sin licencias',           color: 'blue' },
          ].map(t => (
            <div key={t.tech} className={`docs__tech-badge docs__tech-badge--${t.color}`}>
              <span className="docs__tech-name mono">{t.tech}</span>
              <span className="docs__tech-role">{t.role}</span>
            </div>
          ))}
        </div>
        <p className="docs__p" style={{ marginTop: '1rem', marginBottom: 0 }}>
          <strong>Diferenciación:</strong> Al ser una solución de diseño conceptual académico,
          el proyecto ofrece una arquitectura de gestión de accesos adaptable, alineada a
          ISO/IEC 27001:2022 y sin costos de licenciamiento.
        </p>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Caso de Negocio — formato completo</h3>
      <PdfEmbed tabId="caso" title="Caso de negocio.pdf" />
      <PendingCard
        title="Caso de Negocio (formato institucional)"
        description="Documento formal con problema, solución propuesta, alternativas evaluadas, análisis costo-beneficio, ROI, supuestos y restricciones."
      />
    </div>

  </div>
)

// ── Tab: Cédula de Servicio ─────────────────────────────
const TabCedula = (): JSX.Element => (
  <div className="docs__content">

    <div className="docs__section">
      <h3 className="docs__h3">Cédula de Servicio (ITIL)</h3>
      <Deliverable tag="Cédula básica">
        <p className="docs__p">
          Cédula formal del servicio bajo el marco <span className="docs__inline-code mono">ITIL</span>.
          A continuación los campos principales ya definidos; la cédula completa con todos
          los atributos ITIL se encuentra pendiente.
        </p>

        <div className="docs__layers">
          <div className="docs__layer">
            <div className="docs__layer-header">
              <span className="docs__layer-num mono">01</span>
              <div>
                <div className="docs__layer-title">Identificación del servicio</div>
                <div className="docs__layer-sub mono">Datos generales</div>
              </div>
            </div>
            <div className="docs__layer-modules">
              <div className="docs__layer-module"><span className="docs__layer-module-name mono">Nombre</span><span className="docs__layer-module-role">Gestión de accesos a sistemas y correo</span></div>
              <div className="docs__layer-module"><span className="docs__layer-module-name mono">Clave (ID)</span><span className="docs__layer-module-role">ID-ACCESO-001</span></div>
              <div className="docs__layer-module"><span className="docs__layer-module-name mono">Administrador</span><span className="docs__layer-module-role">Martín Francisco Cortes Buendía</span></div>
              <div className="docs__layer-module"><span className="docs__layer-module-name mono">Inicio</span><span className="docs__layer-module-role">17-Mar-2026</span></div>
              <div className="docs__layer-module"><span className="docs__layer-module-name mono">Fin propuesto</span><span className="docs__layer-module-role">12-Jun-2026</span></div>
              <div className="docs__layer-module"><span className="docs__layer-module-name mono">Fecha de elaboración</span><span className="docs__layer-module-role">06-Mar-2026</span></div>
            </div>
          </div>

          <div className="docs__layer">
            <div className="docs__layer-header">
              <span className="docs__layer-num mono">02</span>
              <div>
                <div className="docs__layer-title">Objetivo y descripción</div>
                <div className="docs__layer-sub mono">Propósito del servicio</div>
              </div>
            </div>
            <p className="docs__p">
              Controlar de forma segura el acceso de los usuarios a sistemas y correo
              institucional, garantizando la protección de la información, el cumplimiento
              normativo y la correcta administración de permisos mediante procesos de alta,
              modificación y baja basados en roles (RBAC).
            </p>
          </div>
        </div>
        <PdfEmbed id="1SprNVTBycMKsbLVEVZ9vjBY51_SgJhe5" title="Cédula de servicio — Gestión de accesos.pdf" />
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Cédula ITIL completa</h3>
      <PdfEmbed tabId="cedula" title="Cédula de servicio — Gestión de accesos.pdf" />
      <PendingCard
        title="Cédula de servicio ITIL — formato completo"
        description="Documento ITIL con todos los campos formales: alcance detallado, SLA, OLAs, propietario, gestor, procesos relacionados, métricas, KPIs, dependencias y horario de operación."
      />
    </div>
  </div>
)

// ── Tab: Arquitectura del Servicio ──────────────────────
const TabArquitectura = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Arquitectura del Servicio</h3>
      <p className="docs__p">
        Diseño técnico del servicio de gestión de accesos: componentes, flujos de
        autenticación y autorización, integración con sistemas existentes y diagrama de
        despliegue.
      </p>
      <PdfEmbed tabId="arquitectura" title="Diagrama de arquitectura.pdf" />
      <PendingCard
        title="Arquitectura técnica"
        description="Diagrama de arquitectura del servicio: componentes (directorio, broker de autenticación, SSO, MFA, módulo de auditoría), flujos, protocolos (SAML/OIDC/LDAP) e integración con correo y sistemas."
      />
    </div>
  </div>
)

// ── Tab: Inventario de Activos ──────────────────────────
const TabInventario = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Inventario de Activos</h3>
      <p className="docs__p">
        Inventario consolidado de los activos relacionados con los <strong>3 procesos</strong>{' '}
        del servicio: alta, modificación y baja de accesos. Clasificación por tipo
        (información, hardware, software, personas, servicios) bajo ISO/IEC 27001:2022.
      </p>
      <PdfEmbed tabId="inventario" title="Inventario de activos.pdf" />
      <PendingCard
        title="Inventario integrado — 3 procesos del servicio"
        description="Inventario consolidado de activos de información, hardware, software, personas y servicios para los 3 procesos clave del servicio: alta, modificación y baja de accesos."
      />
    </div>
  </div>
)

// ── Tab: Matriz de Riesgos ──────────────────────────────
const TabMatriz = (): JSX.Element => (
  <div className="docs__content">

    <div className="docs__section">
      <h3 className="docs__h3">Riesgos clave del servicio</h3>
      <Deliverable tag="Riesgos identificados">
        <p className="docs__p">
          Riesgos identificados durante el análisis preliminar del servicio bajo{' '}
          <span className="docs__inline-code mono">ISO/IEC 27001:2022</span>. La matriz
          CID completa y la matriz de infraestructuras críticas se entregan en el Drive
          del proyecto.
        </p>
        <div className="docs__layer-modules">
          {[
            { riesgo: 'Acceso no autorizado por robo de credenciales o fuerza bruta',  impacto: 'Alto',  prob: 'Media' },
            { riesgo: 'Asignación incorrecta de permisos / privilegios excesivos',     impacto: 'Alto',  prob: 'Media' },
            { riesgo: 'Retraso en revocación de accesos de usuarios que salen',         impacto: 'Alto',  prob: 'Alta'  },
            { riesgo: 'Fallas en autenticación que impiden acceso legítimo',           impacto: 'Alto',  prob: 'Baja'  },
            { riesgo: 'Falta de capacitación del personal',                             impacto: 'Medio', prob: 'Media' },
          ].map((r, i) => (
            <div key={i} className="docs__layer-module">
              <span className="docs__layer-module-name mono">{r.impacto} · {r.prob}</span>
              <span className="docs__layer-module-role">{r.riesgo}</span>
            </div>
          ))}
        </div>
      </Deliverable>
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Matriz CID</h3>
      <PdfEmbed tabId="matriz" title="5 Riesgos Gestión Accesos.pdf" />
      <PendingCard
        title="Matriz CID (Confidencialidad · Integridad · Disponibilidad)"
        description="Matriz formal ISO 27000 con valoración por activo en las tres dimensiones CID, controles aplicables del Anexo A y nivel de riesgo residual."
      />
    </div>

    <div className="docs__section">
      <h3 className="docs__h3">Matriz de Infraestructuras Críticas</h3>
      <PendingCard
        title="Matriz de infraestructuras críticas"
        description="Identificación de infraestructuras críticas del servicio, dependencias entre activos, criticidad operacional y plan de protección."
      />
    </div>
  </div>
)

// ── Tab: BIA Táctico ────────────────────────────────────
const TabBIATactico = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">BIA Táctico (3 procesos)</h3>
      <p className="docs__p">
        Tres análisis de impacto al negocio tácticos, uno por cada proceso del servicio
        de gestión de accesos.
      </p>
      <div className="docs__primitives">
        {[
          { icon: '◇', title: 'BIA · Alta de usuarios',         desc: 'Análisis de impacto del proceso de creación de cuentas. RTO, RPO, dependencias, impactos por interrupción.' },
          { icon: '◈', title: 'BIA · Modificación de permisos', desc: 'Análisis de impacto del proceso de cambios en roles y privilegios.' },
          { icon: '◆', title: 'BIA · Baja de usuarios',         desc: 'Análisis de impacto del proceso de revocación y desactivación de accesos.' },
        ].map(b => (
          <div key={b.title} className="docs__primitive">
            <span className="docs__primitive-icon">{b.icon}</span>
            <div>
              <div className="docs__primitive-title mono">{b.title}</div>
              <div className="docs__primitive-desc">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <PdfEmbed tabId="bia-tactico" title="BIA táctico.pdf" />
      <PendingCard
        title="BIA Tácticos — 3 documentos integrados"
        description="Análisis de impacto al negocio para los 3 procesos del servicio. Incluye RTO, RPO, MTPD, impactos financiero, operacional, reputacional y legal."
      />
    </div>
  </div>
)

// ── Tab: BIA Operacional ────────────────────────────────
const TabBIAOperacional = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">BIA Operacional</h3>
      <p className="docs__p">
        Un BIA único a nivel operacional del servicio completo de gestión de accesos,
        que consolida los hallazgos de los 3 BIA tácticos.
      </p>
      <PdfEmbed tabId="bia-operacional" title="BIA operacional.pdf" />
      <PendingCard
        title="BIA Operacional integrado"
        description="BIA único a nivel operacional del servicio completo. Consolida hallazgos de los 3 BIA tácticos en un análisis de impacto end-to-end."
      />
    </div>
  </div>
)

// ── Tab: Plan de Continuidad ────────────────────────────
const TabPlan = (): JSX.Element => (
  <div className="docs__content">
    <div className="docs__section">
      <h3 className="docs__h3">Plan de Continuidad del Negocio</h3>
      <p className="docs__p">
        Documento formal con fases del plan, roles y responsabilidades, procedimientos
        de respuesta y recuperación, comunicación de crisis y plan de pruebas y
        mantenimiento.
      </p>
      <PdfEmbed tabId="plan" title="Plan de Continuidad del Negocio.pdf" />
      <PendingCard
        title="Plan de Continuidad del Negocio (BCP)"
        description="Documento formal con fases del plan, roles, procedimientos de respuesta y recuperación, comunicación de crisis y plan de pruebas y mantenimiento."
      />
    </div>
  </div>
)

// ── Main component ───────────────────────────────────────
const DocsSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabId>('introduccion')
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const renderContent = (): JSX.Element => {
    switch (activeTab) {
      case 'introduccion':    return <TabIntroduccion />
      case 'objetivo':        return <TabObjetivo />
      case 'descripcion':     return <TabDescripcion />
      case 'mvv':             return <TabMVV />
      case 'metas-corp':      return <TabMetasCorp />
      case 'metas-ti':        return <TabMetasTI />
      case 'cascada':         return <TabCascada />
      case 'mapa':            return <TabMapa />
      case 'caso':            return <TabCaso />
      case 'cedula':          return <TabCedula />
      case 'arquitectura':    return <TabArquitectura />
      case 'inventario':      return <TabInventario />
      case 'matriz':          return <TabMatriz />
      case 'bia-tactico':     return <TabBIATactico />
      case 'bia-operacional': return <TabBIAOperacional />
      case 'plan':            return <TabPlan />
    }
  }

  return (
    <section id="contenido" className="docs">
      <div className="docs__grid-lines" />

      <div className="container">
        <div ref={headRef} className="docs__header reveal-up">
          <span className="docs__eyebrow mono">// Índice del proyecto</span>
          <h2 className="docs__title">Entregables y documentación</h2>
          <p className="docs__subtitle">
            Proyecto final de Gobierno de TI. Servicio de gestión de accesos bajo
            COBIT, ITIL e ISO/IEC 27001:2022. Documentos extensos enlazados al Drive
            mediante QR para mantener la lectura ágil.
          </p>
        </div>

        <div className="docs__layout">

          <aside className="docs__sidebar">
            <div className="docs__sidebar-hint mono">
              <span className="docs__sidebar-hint--desktop">↳ Da clic en cada sección para navegar</span>
              <span className="docs__sidebar-hint--mobile">Desliza para ver todas las secciones</span>
            </div>
            <div className="docs__sidebar-tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`docs__tab ${activeTab === tab.id ? 'docs__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="docs__tab-icon">{tab.icon}</span>
                <span className="docs__tab-label">{tab.label}</span>
              </button>
            ))}
            </div>
            <div className="docs__sidebar-footer">
              <a
                href={DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="docs__sidebar-gh mono"
              >
                ⌥ Drive completo →
              </a>
              <div className="docs__sidebar-qr">
                <div className="docs__sidebar-qr-placeholder">
                  <img src="/qrDrive.png" alt="QR carpeta de Drive" className="docs__qr-img" />
                </div>
                <span className="docs__sidebar-qr-label mono">Drive del proyecto</span>
              </div>
            </div>
          </aside>

          <div className="docs__panel">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DocsSection
