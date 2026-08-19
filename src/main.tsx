import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react'
import { commitmentGroups } from './data/commitments'
import { iiaJourney } from './data/iiaJourney'
import './styles.css'

const nav = [['Why me?', 'why'], ['My journey', 'journey'], ['My commitments', 'commitments'], ['Your priorities', 'priorities']]

const reasons = [
  { title: 'I understand the profession', text: 'As a practising architect, I bring real professional realities into every conversation.' },
  { title: 'I invest in the next generation', text: 'I bring more than 25 years of experience as an educator, mentor and academic leader.' },
  { title: 'I know the institution', text: 'I have served IIA Telangana since 2012, including Executive Committee and Joint Honorary Secretary responsibilities.' },
  { title: 'I lead with integrity', text: 'I am committed to listening, participation, transparency and shared responsibility.' },
]

const pillars = [
  { label: 'Practice', text: 'My real-world understanding of architects, studios and professional challenges.' },
  { label: 'Education', text: 'More than 25 years of my teaching, mentoring and academic leadership.' },
  { label: 'Research', text: 'My thoughtful, evidence-led approach to people, spaces and institutions.' },
  { label: 'IIA Service', text: 'My experience of Chapter responsibility, collaboration and contribution.' },
]

function Brand() {
  return <a className="brand" href="#top" aria-label="Dr. Aditya Singaraju, home"><span>AS</span><b>Dr. Aditya<br/>Singaraju</b></a>
}

function Header() {
  const [open, setOpen] = React.useState(false)
  return <header className="siteHeader">
    <Brand/>
    <button className="menuButton" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'open' : ''} aria-label="Primary navigation">
      {nav.map(([label, id]) => <a key={id} href={'#' + id} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="headerCta" href="#commitments" onClick={() => setOpen(false)}>Explore my vision <ArrowRight/></a>
    </nav>
  </header>
}

function SectionHeading({ number, title, intro }: { number: string, title: string, intro?: string }) {
  return <div className="sectionHeading"><span>{number}</span><h2>{title}</h2>{intro ? <p>{intro}</p> : null}</div>
}

function Hero() {
  return <section id="top" className="hero">
    <div className="heroCopy">
      <p className="candidate">Dr. Aditya Singaraju · Candidate for Chairperson · IIA Telangana Chapter</p>
      <h1>A stronger,<br/>more connected<br/><em>IIA Telangana.</em></h1>
      <p className="heroLead">Experience. Ideas. Inclusive leadership.</p>
      <p className="heroText">Bringing architectural practice, education, research and the fraternity closer together—with a Chapter that creates value and opportunity for every member.</p>
      <div className="heroActions">
        <a className="primaryButton" href="#commitments">Explore my vision <ArrowDownRight/></a>
        <a className="textButton" href="#why">Why me? <ArrowRight/></a>
      </div>
      <blockquote>“Experience as my foundation. Learning as my constant companion. Service as my commitment.”</blockquote>
    </div>
    <figure className="heroPortrait">
      <img src="/aditya-singaraju.jpg" width="1241" height="1600" alt="Portrait of Dr. Aditya Singaraju" fetchPriority="high"/>
      <figcaption>Architect · Educator · Researcher · Design Professional</figcaption>
    </figure>
  </section>
}

function WhyAditya() {
  return <section id="why" className="whySection">
    <div className="whyIntro">
      <SectionHeading number="01" title="Why give me an opportunity?"/>
      <p>I understand the profession, the institution and the people our Chapter serves.</p>
      <strong>Experience to understand. Ideas to strengthen. Commitment to serve.</strong>
    </div>
    <div className="reasonGrid">
      {reasons.map(({ title, text }, index) => <article key={title}><span>0{index + 1}</span><strong className="cardNumber">0{index + 1}</strong><h3>{title}</h3><p>{text}</p></article>)}
    </div>
  </section>
}

function Pillars() {
  return <section className="pillarsSection" aria-labelledby="pillars-title">
    <div className="pillarsTitle"><p>One professional journey</p><h2 id="pillars-title">Four perspectives.<br/><em>One leadership vision.</em></h2></div>
    <div className="pillarDiagram">
      {pillars.map(({ label, text }, index) => <article key={label}><strong className="pillarNumber">0{index + 1}</strong><h3>{label}</h3><p>{text}</p></article>)}
      <div className="diagramCore" aria-hidden="true">IIA<br/>Telangana</div>
    </div>
  </section>
}

function Journey() {
  return <section id="journey" className="journeySection">
    <SectionHeading number="02" title="My journey of learning, participation and service" intro="Since 2012, my IIA journey has grown through responsibility, collaboration and contribution at the grassroots level."/>
    <div className="journeyLine">
      {iiaJourney.map((item, index) => <article key={item.year + item.title}><div className="year"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.year}</strong></div><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
    </div>
  </section>
}

function Commitments() {
  let count = 0
  return <section id="commitments" className="commitmentsSection">
    <SectionHeading number="03" title="My ten commitments to a stronger Chapter" intro="My practical framework to make IIA Telangana more participative, connected, useful and future-ready."/>
    <div className="commitmentGroups">
      {commitmentGroups.map((group, groupIndex) => {
        return <article className={'commitmentGroup group' + (groupIndex + 1)} key={group.theme}>
          <header><span>0{groupIndex + 1}</span><h3>{group.theme}</h3></header>
          <div>{group.items.map(([title, description]) => {
            count += 1
            return <section key={title}><b>{String(count).padStart(2, '0')}</b><div><h4>{title}</h4><p>{description}</p></div></section>
          })}</div>
        </article>
      })}
    </div>
  </section>
}

function Reach() {
  return <section className="reachSection">
    <div className="regionalPanel">
      <div className="regionalMark" aria-hidden="true">TG</div>
      <p>Connected across Telangana</p>
      <h3>Every region.<br/>Every member.<br/>A stronger voice.</h3>
      <div className="regionalPoints" aria-label="Regional priorities">
        <span><b>01</b> Regional voices</span>
        <span><b>02</b> Local talent</span>
        <span><b>03</b> Shared opportunity</span>
      </div>
    </div>
    <div><p>Beyond Hyderabad · Across Telangana</p><h2>A Chapter that reaches, listens and connects.</h2><p>I believe regional voices, local talent and member participation should shape our Chapter’s future. My vision is to create meaningful connection and opportunity across Telangana.</p><a href="#priorities">Share what your region needs <ArrowRight/></a></div>
  </section>
}

function Promise() {
  const promises = [
    ['Listen before leading.', 'Understand members’ needs through continuous dialogue.'],
    ['Collaborate before deciding.', 'Build consensus and collective ownership.'],
    ['Act with transparency.', 'Maintain openness and accountability.'],
    ['Create opportunities.', 'Ensure every architect finds value in the Chapter.'],
  ]
  return <section className="promiseSection"><p>My promise to members</p>{promises.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
}

function PrioritiesForm() {
  const [status, setStatus] = React.useState<'idle'|'sending'|'success'|'error'>('idle')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const params = new URLSearchParams()
    new FormData(form).forEach((value, key) => params.append(key, String(value)))
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  return <section id="priorities" className="prioritiesSection">
    <div className="prioritiesCopy">
      <SectionHeading number="04" title="What should IIA Telangana prioritise?"/>
      <p>Strong leadership begins with listening. Share the issue, opportunity or idea you believe deserves the Chapter’s attention.</p>
      <div className="formAssurance"><p><strong>Your voice matters.</strong><br/>I will receive responses privately and use them to understand member priorities across Telangana.</p></div>
    </div>
    <form name="member-priorities" method="POST" action="/thank-you.html" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}>
      <input type="hidden" name="form-name" value="member-priorities"/>
      <p className="botField"><label>Do not fill this out: <input name="bot-field"/></label></p>
      <label>Full name<input name="name" autoComplete="name" required/></label>
      <label>City / region<input name="city" autoComplete="address-level2" required/></label>
      <label>Email or phone <span>(optional)</span><input name="contact"/></label>
      <label>Primary area of interest<select name="priority" required defaultValue=""><option value="" disabled>Select a priority</option><option>Young architects and leadership</option><option>Regional outreach</option><option>Professional practice support</option><option>Transparent governance</option><option>Education and research</option><option>Digital member services</option><option>Other</option></select></label>
      <label className="full">Your idea or suggestion<textarea name="message" rows={5} required placeholder="What would make the Chapter more valuable to you?"/></label>
      <label className="consent full"><input type="checkbox" name="consent" value="yes" required/> I consent to this response being used privately to understand campaign and member priorities.</label>
      <button className="primaryButton" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Share my priorities'} <ArrowRight/></button>
      <p className={'formStatus ' + status} aria-live="polite">{status === 'success' ? 'Thank you. Your priorities have been received.' : status === 'error' ? 'The form could not be sent. Please try again.' : ''}</p>
    </form>
  </section>
}

function Closing() {
  return <section id="support" className="closingSection">
    <div><p>A new chapter for IIA Telangana</p><h2>Give my experience, ideas and inclusive leadership <em>an opportunity.</em></h2><p>With your trust and participation, I seek the opportunity to help build a Chapter that supports established practitioners, encourages young architects and represents members across Telangana.</p><a className="lightButton" href="#journey">Discover my journey <ArrowRight/></a></div>
    <aside><span className="closingNumber">AS</span><blockquote>“Together, let us build a Chapter that is inclusive, inspiring and accountable.”</blockquote><strong>Dr. Aditya Singaraju</strong><span>Candidate for Chairperson · IIA Telangana Chapter</span></aside>
  </section>
}

function Footer() {
  return <footer><Brand/><p>A stronger, more connected IIA Telangana.</p><p>© {new Date().getFullYear()} Dr. Aditya Singaraju</p></footer>
}

function App() { return <><Header/><main><Hero/><WhyAditya/><Pillars/><Journey/><Commitments/><Reach/><Promise/><PrioritiesForm/><Closing/></main><Footer/></> }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
