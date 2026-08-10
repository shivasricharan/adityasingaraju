import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react'
import { profile } from './data/profile'
import { siteConfig } from './data/siteConfig'
import { iiaJourney } from './data/iiaJourney'
import { commitmentGroups } from './data/commitments'
import { research } from './data/research'
import './styles.css'

const nav = [['About','about'],['Journey','journey'],['IIA','iia'],['Vision','vision'],['Research & Practice','research'],['Contact','contact']]

function Header(){const [open,setOpen]=React.useState(false);return <header className="header"><a className="brand" href="#top" aria-label="Dr. Aditya Singaraju, home"><span>AS</span><b>Dr. Aditya<br/>Singaraju</b></a><button className="menu" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button><nav className={open?'open':''} aria-label="Primary navigation">{nav.map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}<a className="navCta" href={siteConfig.electionMode?'#vision':'#contact'}>{siteConfig.electionMode?'My Vision for IIA Telangana':'Work With Me'} <ArrowRight/></a></nav></header>}

function SectionTitle({number,title,children}:{number:string,title:string,children?:React.ReactNode}){return <div className="sectionTitle reveal"><span>{number}</span><h2>{title}</h2>{children}</div>}

function App(){return <><Header/><main id="top">
  <section className="hero ruled" aria-labelledby="hero-title"><div className="heroCopy"><h1 id="hero-title">Dr. Aditya<br/>Singaraju</h1><p className="roles">{profile.roles}</p><blockquote>“{profile.statement}”</blockquote>{siteConfig.electionMode?<div className="candidature"><span>Candidate for Chairperson</span><strong>Indian Institute of Architects — Telangana Chapter</strong><em>{siteConfig.electionDates}</em></div>:<p className="intro">{profile.bio}</p>}<div className="actions"><a className="primary" href="#vision">Explore My Vision <ArrowDownRight/></a><a className="secondary" href="#journey">My Journey <ArrowRight/></a></div></div><figure className="portrait"><img src="/aditya-singaraju.png" alt="Portrait of Dr. Aditya Singaraju"/><figcaption>Architect · Educator · Researcher</figcaption></figure></section>

  <section id="about" className="worlds"><SectionTitle number="01" title="A career across three worlds"><p>{profile.bio}</p></SectionTitle><div className="worldGrid">{[
    ['Academia','25+ years associated with the School of Planning and Architecture, JNAFA University—teaching, mentoring, curriculum development and academic leadership.'],
    ['Practice','Principal Architect at IDENTIFIVE Designs, working across architecture, interiors, residential, commercial, retail, restaurant and identity design.'],
    ['Research','Inquiry at the intersection of environmental psychology, spatial cognition, human navigation and wayfinding behaviour.']
  ].map((x,i)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

  <section id="journey" className="journey band"><SectionTitle number="02" title="IIA journey"><p>Service → contribution → leadership</p></SectionTitle><div className="timeline">{iiaJourney.map((m,i)=><article key={m.year}><div className="dot"/><span>{String(i+1).padStart(2,'0')}</span><h3>{m.year}</h3><p>{m.text}</p></article>)}</div></section>

  <section id="iia" className="stepping"><div className="architecturalMark" aria-hidden="true">L</div><div><SectionTitle number="03" title="Why I am stepping forward"/><blockquote>Listen before leading.</blockquote><p>I believe leadership begins with attention—to members, to young architects, to academia and practice, and to voices across Telangana. I am stepping forward to help build a Chapter shaped by collaboration, inclusiveness, shared learning and collective growth.</p></div></section>

  <section id="vision" className="manifesto"><SectionTitle number="04" title="Ten commitments"><p>A considered framework for a stronger, more connected IIA Telangana.</p></SectionTitle><div className="commitmentGrid">{commitmentGroups.map((g,gi)=><article key={g.theme}><header><span>0{gi+1}</span><h3>{g.theme}</h3></header><ol start={commitmentGroups.slice(0,gi).reduce((n,x)=>n+x.items.length,1)}>{g.items.map(([t,d])=><li key={t}><h4>{t}</h4><p>{d}</p></li>)}</ol></article>)}</div></section>

  <section className="promise"><p>My promise to members</p>{['Listen before leading.','Collaborate before deciding.','Act with transparency.','Create opportunities.'].map((x,i)=><div key={x}><span>0{i+1}</span><h2>{x}</h2></div>)}</section>

  <section id="research" className="professional"><SectionTitle number="05" title="Research & practice"/><div className="profGrid"><article><h3>Professional journey</h3><p>Dr. Singaraju’s work moves across architectural consultancy, interiors, academic leadership, teaching, thesis guidance, mentoring, product and identity design, lectures and conferences.</p><p>As Head, Department of Architecture from 2015–2017, and through academic committee and Board of Studies responsibilities, he has contributed to institutions as both educator and administrator.</p><p>He also mentors young architecture aspirants preparing for NATA and JEE B.Arch.</p></article><article><h3>Research & interests</h3><ul>{research.map(x=><li key={x}>{x}</li>)}</ul></article></div></section>

  <section className="education band"><SectionTitle number="06" title="Education"/><div className="educationLine">{profile.education.map(e=><article key={e.year}><span>{e.year}</span><h3>{e.degree}</h3><p>{e.institution}</p></article>)}</div><p className="phd">Ph.D. research focus: Environmental Psychology, spatial cognition, human navigation and wayfinding behaviour.</p></section>

  {siteConfig.electionMode?<section className="newChapter"><p>A new chapter for IIA Telangana</p><h2>Together, let us build a Chapter that is <em>inclusive, inspiring and accountable.</em></h2><a href="#vision">Read My Vision <ArrowRight/></a></section>:null}

  <section id="contact" className="contact"><div><SectionTitle number="07" title="Professional engagements"/><p>For architecture and design, academic or research collaboration, guest lectures, mentoring, institutional engagements and professional associations.</p></div><form name="contact" method="POST" data-netlify="true"><input type="hidden" name="form-name" value="contact"/><label>Full name<input required name="name" autoComplete="name"/></label><label>Email address<input required type="email" name="email" autoComplete="email"/></label><label className="wide">Area of interest<select name="interest"><option>Architecture & Design</option><option>Academic / Research Collaboration</option><option>Guest Lectures</option><option>Mentoring</option><option>Institutional Engagements</option><option>Professional Associations</option></select></label><label className="wide">Message<textarea required name="message" rows={5}/></label><button type="submit">Send enquiry <ArrowRight/></button></form></section>
  </main><footer><a className="brand inverse" href="#top"><span>AS</span><b>Dr. Aditya<br/>Singaraju</b></a><p>{profile.roles}</p><p>© {new Date().getFullYear()} Dr. Aditya Singaraju</p></footer></>}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
