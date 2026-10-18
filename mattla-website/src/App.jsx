import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChatWidget from './ChatWidget'
import ServicesPage from './ServicesPage'

const services = [
  {
    number: '01',
    name: 'Renewable Energy Engineering',
    description: 'Grid integration, grid connection studies, Grid Code compliance, plant monitoring, protection testing and project advisory services.',
    details: ['Wind, Solar PV, CSP, Biomass, Landfill Gas, Coal and Hydro', 'Plant grid connection studies', 'Grid Code certification', 'Project advisory services'],
  },
  {
    number: '02',
    name: 'Power System Analysis',
    description: 'Protection feasibility studies, relay settings and coordination, static and dynamic fault analysis, EMT simulations and fault investigations.',
    details: ['System planning', 'Feasibility studies', 'Network master planning', 'Network development planning', 'System refurbishment studies', 'Relay settings', 'Protection coordination', 'Fault analysis', 'EMT simulations'],
  },
  {
    number: '03',
    name: 'Protection, DC Systems / SCADA / Telecommunications / Metering',
    description: 'Protection design and studies, SCADA consultation, design, implementation and maintenance, RTU configuration, telecommunications and metering services.',
    details: ['SCADA consultation', 'SCADA design and implementation', 'SCADA maintenance', 'RTU configuration', 'DC systems', 'Telecommunications', 'Protection design', 'Protection studies', 'Metering design, monitoring and installations', 'PPC controller interfacing', 'Signal verification', 'Eskom control-centre testing'],
  },
  {
    number: '04',
    name: 'Technical Auditing & Project Management',
    description: 'Technical and substation protection audits, with project management from feasibility through tender documentation, supervision and handover.',
    details: ['Technical audits', 'Protection audits', 'Compliance assessments', 'Project management', 'Feasibility', 'Preliminary design', 'Tender documentation', 'Work execution', 'Supervision', 'Project handover'],
  },
  {
    number: '05',
    name: 'Substation & HV Line Design',
    description: 'Network planning and refurbishment studies, substation design, drawings, single-line diagrams, materials and quantity schedules.',
    details: ['Substation design', 'Primary plant', 'Control plant', 'Drawings', 'Single Line Diagrams', 'Bill of Materials', 'Bill of Quantities', 'Project costing', 'Constructability'],
  },
]

const regions = [
  { name: 'Western Cape', projects: '8', map: 'western-cape', projectList: ['Kimberly Clark Solar Plant (Energy Partners)', 'Wolseley Wind Farm (Acciona)', 'Zen Wind Farm (Acciona)', 'Bergrivier Wind Farm (Acciona)', 'Aberdeen Wind Farm (Acciona)', 'Loxton Wind Farm (Acciona)'] },
  { name: 'Northern Cape', projects: '3', map: 'northern-cape', projectList: ['San Solar (Acciona)', 'Hydra D Koruso (EDF)', 'Koruson MTS and Hydra Cluster (EDF)'] },
  { name: 'Free State', projects: '3', map: 'free-state', projectList: ['CASTE Wind Farm (Goldwind)', 'Msenge Wind Farm (Goldwind)', 'Free State Sites Capacity Studies (EDF)'] },
  { name: 'Gauteng', projects: '4', map: 'gauteng', projectList: ['Khanyisa Solar (Goldfields)', 'Robinson Deep Biogas Plant', 'Goukoppies Biogas Plant', 'Marie Louise Biogas Plant'] },
  { name: 'North West', projects: '1', map: 'north-west', projectList: ['ESIPPPP Anticipated Sites Study (EDF)'] },
  { name: 'Limpopo', projects: '1', map: 'limpopo', projectList: ['ESIPPPP Anticipated Sites Study (EDF)'] },
  { name: 'Mpumalanga', projects: '1', map: 'mpumalanga', projectList: ['ESIPPPP Anticipated Sites Study (EDF)'] },
]

const metrics = [
  { value: 120, suffix: '+', label: ['Years of combined', 'senior experience'] },
  { value: 7, suffix: '', label: ['South African provinces', 'in our project reach'] },
  { value: 5, suffix: '', label: ['Specialist', 'business units'] },
  { value: 100, suffix: '%', label: ['Wholly black', 'owned SA company'] },
]

const partners = [
  ['Acciona', 'Acciona_Logo.png'],
  ['ACWA Power', 'Acwa_Power_Logo.png'],
  ['African Sun Energy', 'African_Sun_Energy_Logo.png'],
  ['Bio2Watt', 'Bio2Watt_Logo.png'],
  ['Bosch Projects', 'Bosch_Projects_Logo.png'],
  ['Enel Green Power', 'Enel_Green_Power_Logo.png'],
  ['Goldwind', 'Goldwind_Logo.png'],
  ['JUWI', 'Juwi_Logo.png'],
  ['Karpowership', 'Karpowership_Logo.png'],
  ['Kouga Wind Farm', 'Kouga_Wind_Farm_Logo.png'],
  ['Longyuan Power', 'Longyuan_Power_Logo.png'],
  ['Mulilo', 'Mulilo_Logo.png'],
  ['PV Solutions', 'PV_Solutions_Logo.png'],
  ['Sappi', 'Sappi_Logo.png'],
  ['Scatec Solar', 'Scatec_Solar_Logo.png'],
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [page, setPage] = useState(() => window.location.pathname === '/services' ? 'services' : 'home')
  const [expandedService, setExpandedService] = useState(null)
  const [activeRegion, setActiveRegion] = useState(regions[0])
  const [metricValues, setMetricValues] = useState(() => metrics.map(() => 0))
  const metricsRef = useRef(null)

  useEffect(() => {
    function handlePopState() {
      setPage(window.location.pathname === '/services' ? 'services' : 'home')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const metricSection = metricsRef.current
    if (!metricSection) return undefined

    let animationFrame
    let hasAnimated = false

    function showFinalValues() {
      setMetricValues(metrics.map((metric) => metric.value))
    }

    function animateMetrics() {
      if (hasAnimated) return
      hasAnimated = true

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showFinalValues()
        return
      }

      const duration = 850
      const startTime = performance.now()

      function updateMetrics(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const easedProgress = 1 - (1 - progress) ** 3
        setMetricValues(metrics.map((metric) => Math.round(metric.value * easedProgress)))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateMetrics)
        }
      }

      animationFrame = requestAnimationFrame(updateMetrics)
    }

    if (!('IntersectionObserver' in window)) {
      animateMetrics()
      return () => cancelAnimationFrame(animationFrame)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animateMetrics()
        observer.disconnect()
      }
    }, { threshold: 0.35 })

    observer.observe(metricSection)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  function submitForm(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  function openServices(event) {
    event.preventDefault()
    window.history.pushState({}, '', '/services')
    setPage('services')
    window.scrollTo(0, 0)
  }

  function toggleService(number) {
    setExpandedService((current) => current === number ? null : number)
  }

  if (page === 'services') {
    return <><ServicesPage /><ChatWidget /></>
  }

  return (
    <main>
      <header className="header">
        <a className="brand" href="#home" aria-label="Mattla home">
          <img src="/logos/MATTLA_Logo_RGB.svg" alt="Mattla Engineering Solutions" />
        </a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={item === 'Services' ? '/services' : `#${item.toLowerCase().replace(' ', '-')}`} onClick={item === 'Services' ? openServices : closeMenu}>{item}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <Arrow /></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="shell hero-content">
          <p className="eyebrow light">MATTLA ENGINEERING SOLUTIONS</p>
          <h1>Engineering<br />that keeps the<br /><em>grid running.</em></h1>
          <p className="hero-copy">Specialist engineering for renewable integration, grid compliance and resilient power infrastructure - grounded in South Africa, informed by international experience.</p>
          <a className="button" href="#services">Explore our expertise <Arrow /></a>
        </div>
      </section>

      <section className="intro dotted" id="about-us">
        <div className="shell intro-grid">
          <div>
            <p className="eyebrow blue">OUR EXPERTISE & IMPACT</p>
            <h2>Engineering expertise for complex <span>energy systems.</span></h2>
          </div>
          <div className="intro-side">
            <img src="/images/engineering-expertise.png" alt="Solar panels and power transmission infrastructure" />
            <p>MATTLA is a 100% wholly black owned South African engineering company established in 2015, providing multidisciplinary solutions across the energy value chain.</p>
            <p>Specialist expertise, international experience and local knowledge enable MATTLA to support projects as consulting engineers, renewable project managers, owner&apos;s engineers, grid connection advisors and design engineers throughout sub-Saharan Africa.</p>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="shell">
          <div className="service-heading">
            <div>
              <p className="eyebrow dark">BUSINESS UNITS</p>
              <p className="section-kicker">service architecture</p>
              <h2>Five specialist business units across the Energy value chain</h2>
            </div>
            <p>The company is divided into five business units, each offering unique specialist services and capable of providing fully integrated services to meet the needs of any project.</p>
          </div>
          <div className="service-list">
            {services.map((service) => {
              const isExpanded = expandedService === service.number
              const detailsId = `service-details-${service.number}`

              return (
                <article className={`service-row ${isExpanded ? 'is-expanded' : ''}`} key={service.number}>
                  <button className="service-trigger" type="button" aria-expanded={isExpanded} aria-controls={detailsId} onClick={() => toggleService(service.number)}>
                    <div className="service-name"><span>{service.number}</span><h3>{service.name}</h3></div>
                    <p>{service.description}</p>
                    <span className="service-toggle" aria-hidden="true" />
                  </button>
                  <div className="service-details" id={detailsId}>
                    <div className="service-details-content">
                      <p>Specialist services</p>
                      <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="partner-section">
        <div className="shell partner-grid">
          <div className="partner-image">
            <img src="/images/local-expertise.png" alt="Solar engineer with South Africa's first EMT model validation approval" />
          </div>
          <div className="partner-copy">
            <p className="eyebrow blue">WHY PARTNER WITH MATTLA</p>
            <h2>Local expertise.<br /><mark>International<br />perspective.</mark></h2>
            <p>MATTLA combines specialised engineering capabilities, international best practices and collaborative industry partnerships to deliver reliable, future-ready energy solutions across sub-Saharan Africa.</p>
            <ol>
              <li>Specialist energy engineering expertise</li>
              <li>Extensive Grid Code Compliance experience</li>
              <li>International experience and best practices</li>
              <li>Strong local and international partnerships</li>
              <li>Multidisciplinary engineering capability</li>
              <li>Experience across sub-Saharan Africa</li>
            </ol>
          </div>
        </div>
        <div className="stats" ref={metricsRef}>
          {metrics.map((metric, index) => (
            <div key={metric.value}>
              <strong>{String(metricValues[index]).padStart(metric.value < 10 ? 2 : 1, '0')}{metric.suffix}</strong>
              <span>{metric.label[0]}<br />{metric.label[1]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="reach" id="projects">
        <div className="shell reach-grid">
          <div>
            <p className="eyebrow blue">PROJECT REACH</p>
            <h2>Connected<br />across South<br />Africa</h2>
            <div className="region-list" aria-label="Project reach by province">
              {regions.map((region) => (
                <button className={activeRegion.name === region.name ? 'active' : ''} type="button" key={region.name} aria-pressed={activeRegion.name === region.name} onClick={() => setActiveRegion(region)}>
                  <span>{region.name}</span><b>{region.projects}</b>
                </button>
              ))}
            </div>
          </div>
          <div className="map-area">
            <img className="province-map" src={`/images/project-reach/${activeRegion.map}.png`} alt={`Map of South Africa highlighting ${activeRegion.name}`} />
            <a className="map-attribution" href="https://www.geoboundaries.org/" target="_blank" rel="noreferrer">Province boundaries: geoBoundaries</a>
            <div className="project-detail">
              <h3>{activeRegion.name}</h3>
              <ul>{activeRegion.projectList.map((project) => <li key={project}>{project}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="clients">
        <div className="shell">
          <p className="eyebrow blue">SOME OF OUR CLIENTS & PARTNERS</p>
          <div className="logo-cloud">
            {partners.map(([name, fileName]) => (
              <img key={fileName} src={`/logos/${fileName}`} alt={`${name} logo`} />
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow green">START A CONVERSATION</p>
            <h2>Engineer<br />what<br />comes<br />next.</h2>
            <p>Tell us what you are connecting, studying or delivering. Our senior team will route your enquiry to the right technical discipline.</p>
            <a href="mailto:info@mattla.co.za">info@mattla.co.za</a>
            <a href="tel:+27834991999">+27 83 499 1999</a>
          </div>
          <form onSubmit={submitForm}>
            <label>Name<input required name="name" placeholder="Enter name" /></label>
            <label>Company<input name="company" placeholder="Enter company" /></label>
            <label>Email<input required type="email" name="email" placeholder="Enter email" /></label>
            <label>Telephone<input name="telephone" placeholder="Enter telephone" /></label>
            <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select an engineering service</option><option>Renewable Energy Engineering</option><option>Power System Analysis</option><option>Grid Code Compliance</option><option>Technical Auditing</option></select></label>
            <label>Project location<input name="location" placeholder="Province / country" /></label>
            <label>Message<textarea required name="message" placeholder="Outline the technical challenge, timing and current project stage." rows="3" /></label>
            {submitted && <p className="form-success" role="status">Thank you. Your enquiry is ready for the MATTLA team.</p>}
            <button className="button" type="submit">Send enquiry <Arrow /></button>
          </form>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div><a className="brand" href="#home"><img src="/logos/MATTLA_Logo_RGB.svg" alt="Mattla Engineering Solutions" /></a><h3>Local expertise.<br />International<br /><span>experience.</span></h3><p>P.O. Box 1134, O.R. Tambo Int. Airport 1627<br />Johannesburg, South Africa</p></div>
          <div><p className="footer-title">EXPLORE</p><a href="#home">Home</a><a href="#about-us">About Us</a><a href="#services">Services</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
          <div><p className="footer-title">EXPERTISE</p><a href="#services">Renewable energy</a><a href="#services">Power system studies</a><a href="#services">Grid Code compliance</a><a href="#services">SCADA & metering</a><a href="#services">Technical auditing</a></div>
          <div><p className="footer-title">CONTACT</p><a href="mailto:info@mattla.co.za">info@mattla.co.za</a><a href="tel:+27834991999">+27 83 499 1999</a><p>Registration<br />2015/170811/07</p></div>
        </div>
      </footer>
      <ChatWidget />
    </main>
  )
}

export default App
