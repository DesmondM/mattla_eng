import { useState } from 'react'
import './ServicesPage.css'

const serviceUnits = [
  {
    number: '01',
    title: 'Renewable Energy',
    intro: 'Grid integration of wind, biomass, landfill gas and solar energy plants (CSP and PV), as well as coal-fired and hydro technologies.',
    cards: [
      ['Grid Code Compliance', ['Grid Code Compliance assessment, monitoring and enforcing', 'Renewable Power Plant Grid Code Compliance certification', 'Development of renewable power plant test procedures', 'RPP protection testing and measurements']],
      ['Plant grid connection', ['Plant Grid Connection Studies and client advice during Grid Code Exemption Applications with NERSA.']],
      ['Plant monitoring', ['Enhanced plant monitoring services covering power quality, fault performance, deemed energy calculations and investigations.']],
      ['Advisory & design', ['Project Advisory Services', 'Renewable energy seminars and training', 'Substation Design (Primary and Control Plant)']],
    ],
  },
  {
    number: '02',
    title: 'Protection, DC Systems, SCADA, Telecommunications & Metering',
    intro: 'Affordable automation, telecommunications and enterprise solutions, with SCADA consultation, design, implementation and maintenance for renewable energy plants, transmission and distribution.',
    cards: [
      ['Protection & metering', ['Protection design and studies', 'Metering design, monitoring and installations']],
      ['Signal verification & testing', ['SCADA signal updates and function verification are an optional client scope.', 'Local testing and interfacing of the PPC controller to Version 3 Grid Code', 'Review and update of the existing signal list', 'D20 configuration updates', 'End-to-end testing (Eskom)', 'Functional testing to Eskom control centre']],
      ['RTU configurations', ['RTU point assignments and configurations for the installation of new and existing RTU panels.']],
      ['SCADA & telecommunications', ['SCADA consultation, design, implementation and maintenance services for renewable energy plants, transmission and distribution.']],
    ],
  },
  {
    number: '03',
    title: 'Power System Analysis',
    intro: 'Feasibility studies, relay settings and coordination, and fault investigations to assess protection schemes and system operations.',
    cards: [
      ['Feasibility studies', ['Studies on the replacement of primary and secondary protection equipment. Analysis of protection schemes identifies whether upgrading or replacement is required.']],
      ['Relay settings & coordination', ['Settings are calculated, validated and coordinated using simulation packages. Faults are analysed under static and dynamic conditions for different types of plants and relays.']],
      ['EMT simulations & design', ['Extensive electromagnetic transient (EMT) simulations support optimised settings and configurations.', 'Substation Design (Primary and Control Plant)']],
      ['Fault investigations & consultancy', ['Extensive investigations into abnormal system operations.']],
    ],
  },
  {
    number: '04',
    title: 'Substation & HV Line Design',
    intro: 'System planning, feasibility studies and substation design for power system expansion and refurbishment initiatives.',
    cards: [
      ['System planning & feasibility', ['Feasibility studies for power system expansion initiatives, producing long-term network master plans and short-term network development plans.']],
      ['Refurbishment studies', ['Feasibility studies for the refurbishment of substations and power lines across transmission, sub-transmission and distribution. The key outcome is a System Refurbishment Plan.']],
      ['Substation design', ['Drawings', 'Single Line Diagrams', 'Bill of Materials (BOM)', 'Bill of Quantities (BOQ)']],
      ['Project planning', ['Project costing', 'Environmental Management Plan', 'Constructability']],
    ],
  },
  {
    number: '05',
    title: 'Technical Auditing & Project Management',
    intro: 'Technical audits, comprehensive substation protection audits and project management from feasibility studies through to project handover.',
    cards: [
      ['Technical audits', ['Technical audit results are formalised into reports with recommendations addressing identified differences and shortcomings. Comprehensive substation protection audit services are also available.']],
      ['Potential audit outcomes', ['Reduced production downtime', 'Reliable energy supplies', 'Savings on insurance premiums', 'Long-term plant health', 'Compliance with statutory requirements', 'Reduced risk', 'Safe working conditions and increased overall performance']],
      ['Project management', ['Project delivery focused on time, budget and meeting client requirements.']],
      ['Feasibility to handover', ['Feasibility studies', 'Preliminary design', 'Tender documentation', 'Work execution and supervision', 'Project management through to handover']],
    ],
  },
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function submitForm(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section className="contact service-contact" id="contact">
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
  )
}

export default function ServicesPage() {
  return (
    <main className="services-page">
      <header className="header">
        <a className="brand" href="/" aria-label="Mattla home"><img src="/logos/MATTLA_Logo_RGB.svg" alt="Mattla Engineering Solutions" /></a>
        <nav className="nav services-nav">
          <a href="/">Home</a><a href="/#about-us">About Us</a><a className="active" href="/services">Services</a><a href="/#projects">Projects</a><a href="#contact">Contact</a>
          <a className="nav-cta" href="#contact">Start a project <Arrow /></a>
        </nav>
      </header>

      <section className="services-hero">
        <div className="shell">
          <p className="eyebrow light">MATTLA BUSINESS UNITS</p>
          <h1>Redefining<br />the limits of<br /><span>engineering</span></h1>
          <p>Each business unit offers unique specialist services and can provide fully integrated services to meet the needs of a project.</p>
        </div>
      </section>

      <div className="service-units" id="service-units">
        {serviceUnits.map((unit, index) => (
          <section className={`service-unit ${index % 2 ? 'muted' : ''}`} key={unit.number}>
            <div className="shell service-unit-grid">
              <div className="service-number" aria-hidden="true">{unit.number}</div>
              <div className="service-unit-content">
                <h2>{unit.title}</h2>
                <p className="service-intro">{unit.intro}</p>
                <div className="service-card-grid">
                  {unit.cards.map(([title, items]) => (
                    <article className="service-card" key={title}>
                      <h3>{title}</h3>
                      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </article>
                  ))}
                </div>
                <a className="button" href="#contact">Discuss your project <Arrow /></a>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ContactSection />

      <footer>
        <div className="shell footer-grid">
          <div><a className="brand" href="/"><img src="/logos/MATTLA_Logo_RGB.svg" alt="Mattla Engineering Solutions" /></a><h3>Local expertise.<br />International<br /><span>experience.</span></h3><p>P.O. Box 1134, O.R. Tambo Int. Airport 1627<br />Johannesburg, South Africa</p></div>
          <div><p className="footer-title">EXPLORE</p><a href="/">Home</a><a href="/#about-us">About Us</a><a href="/services">Services</a><a href="/#projects">Projects</a><a href="#contact">Contact</a></div>
          <div><p className="footer-title">EXPERTISE</p><a href="#service-units">Renewable energy</a><a href="#service-units">Power system studies</a><a href="#service-units">Grid Code compliance</a><a href="#service-units">SCADA & metering</a><a href="#service-units">Technical auditing</a></div>
          <div><p className="footer-title">CONTACT</p><a href="mailto:info@mattla.co.za">info@mattla.co.za</a><a href="tel:+27834991999">+27 83 499 1999</a><p>Registration<br />2015/170811/07</p></div>
        </div>
      </footer>
    </main>
  )
}
