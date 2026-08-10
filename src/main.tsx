import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react'
import { profile } from './data/profile'
import { siteConfig } from './data/siteConfig'
import { iiaJourney } from './data/iiaJourney'
import { commitmentGroups } from './data/commitments'
import { research } from './data/research'
import './styles.css'

const nav = [['About','about'],['IIA Journey','journey'],['Vision','vision'],['Practice & Research','research'],['Education','education']]
const professionalItems = [
  ['Architecture & Practice','Principal Architect, IDENTIFIVE Designs','Architecture · Interiors · Residential · Commercial · Retail · Restaurant · Product · Identity'],
  ['Academic Leadership','25+ years at JNAFA University','Head, Department of Architecture 2015–2017 · Teaching · Mentoring · Curriculum · Academic governance'],
  ['Research','Environmental Psychology · Spatial Cognition · Wayfinding','Human navigation · Design education · Design thinking · Design communication'],
  ['Mentoring','Architecture aptitude preparation','NATA · JEE B.Arch · Design thinking · Spatial reasoning']
]

function useElectionCountdown(){const calculate=React.useCallback(()=>{const now=Date.now(),start=new Date(siteConfig.electionStart).getTime(),end=new Date(siteConfig.electionEnd).getTime();if(now>end)return{value:'Complete',label:'Election period'};if(now>=start)return{value:'Voting open',label:'Until 21 August'};const distance=start-now;return{value:String(Math.max(0,Math.floor(distance/86400000))).padStart(2,'0'),label:'days to election'}},[]);const [countdown,setCountdown]=React.useState(calculate);React.useEffect(()=>{const id=window.setInterval(()=>setCountdown(calculate()),60000);return()=>window.clearInterval(id)},[calculate]);return countdown}

function Header(){const [open,setOpen]=React.useState(false);const [active,setActive]=React.useState('about');const countdown=useElectionCountdown();React.useEffect(()=>{const sections=nav.map(([,id])=>document.getElementById(id)).filter(Boolean) as HTMLElement[];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)}),{rootMargin:'-25% 0px -60%'});sections.forEach(section=>observer.observe(section));return()=>observer.disconnect()},[]);return <>{siteConfig.electionMode?<div className="electionBar"><a href="#vision"><strong>IIA Telangana Elections · {siteConfig.electionDates}</strong><em>{countdown.value} {countdown.label}</em></a></div>:null}<header className={siteConfig.electionMode?'header':'header noElection'}><a className="brand" href="#top" aria-label="Dr. Aditya Singaraju, home"><span>AS</span><b>Dr. Aditya<br/>Singaraju</b></a><button className="menu" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button><nav className={open?'open':''} aria-label="Primary navigation">{nav.map(([label,id])=><a className={active===id?'active':''} aria-current={active===id?'location':undefined} key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}<a className="navCta" href={siteConfig.electionMode?'#vision':'#research'}>{siteConfig.electionMode?'My Vision for IIA Telangana':'Explore My Work'} <ArrowRight/></a></nav></header></>}

function ScrollProgress(){const [progress,setProgress]=React.useState(0);React.useEffect(()=>{let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?scrollY/max:0)})};update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',update);removeEventListener('resize',update)}},[]);return <div className="scrollProgress" aria-hidden="true" style={{transform:`scaleX(${progress})`}}/>}

function useReveals(){React.useEffect(()=>{const items=document.querySelectorAll<HTMLElement>('[data-reveal], .timeline article, .promise > div, .educationLine article');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.18});items.forEach(item=>observer.observe(item));return()=>observer.disconnect()},[])}

function SectionTitle({number,title,children}:{number:string,title:string,children?:React.ReactNode}){return <div className="sectionTitle reveal"><span>{number}</span><h2>{title}</h2>{children}</div>}

function App(){const [activeTheme,setActiveTheme]=React.useState(0);const [activeProfessional,setActiveProfessional]=React.useState(0);useReveals();return <><ScrollProgress/><Header/><main id="top">
  <section className="hero ruled" aria-labelledby="hero-title"><div className="heroCopy"><h1 id="hero-title">Dr. Aditya<br/>Singaraju</h1><p className="roles">{profile.roles}</p><blockquote>“{profile.statement}”</blockquote>{siteConfig.electionMode?<div className="candidature"><span>Candidate for Chairperson</span><strong>Indian Institute of Architects — Telangana Chapter</strong><em>{siteConfig.electionDates}</em></div>:<p className="intro">{profile.bio}</p>}<p className="bridge">Bringing practice, academia and the fraternity closer together.</p><div className="actions"><a className="primary" href="#vision">My Vision for IIA Telangana <ArrowDownRight/></a><a className="secondary" href="#journey">IIA Journey <ArrowRight/></a></div></div><figure className="portrait"><img src="/aditya-singaraju.jpg" width="1101" height="1429" alt="Portrait of Dr. Aditya Singaraju" fetchPriority="high"/><figcaption>Architect · Educator · Researcher</figcaption></figure></section>

  <section id="about" className="worlds"><SectionTitle number="01" title="Practice. Education. Research."><p>Three parts of one professional journey.</p></SectionTitle><div className="worldGrid">{[
    ['Education','25+ years associated with the School of Planning and Architecture, JNAFA University—teaching, mentoring, curriculum development and academic leadership.'],
    ['Practice','Principal Architect at IDENTIFIVE Designs, working across architecture, interiors, residential, commercial, retail, restaurant and identity design.'],
    ['Research','Inquiry at the intersection of environmental psychology, spatial cognition, human navigation and wayfinding behaviour.']
  ].map((x,i)=><article data-reveal tabIndex={0} key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p><ArrowDownRight aria-hidden="true"/></article>)}</div></section>

  <section id="journey" className="journey band"><SectionTitle number="02" title="IIA journey"><p>His candidature continues an association with the fraternity that began in 2012—through service, responsibility and contribution.</p></SectionTitle><div className="timeline">{iiaJourney.map((m,i)=><article key={m.year}><div className="dot"/><span>{String(i+1).padStart(2,'0')}</span><div><h3>{m.year}</h3><p>{m.text}</p></div></article>)}</div></section>

  <section id="iia" className="stepping typographic"><div className="statementIndex" aria-hidden="true">03</div><div><SectionTitle number="03" title="Why I am stepping forward"/><blockquote>Listen before leading.</blockquote><p>I believe leadership begins with listening—to members, young architects, practitioners, educators and voices across Telangana.</p><p>My journey across practice, academia, research and IIA has shown me the value of bringing these communities closer. I am stepping forward to help build a Chapter that is more participative, connected, transparent and useful to every member.</p></div></section>

  <section id="vision" className="manifesto"><SectionTitle number="04" title="Ten commitments"><p>A considered framework for a stronger, more connected IIA Telangana.</p></SectionTitle><div className="commitmentGrid">{commitmentGroups.map((g,gi)=><article className={activeTheme===gi?'active':''} onMouseEnter={()=>setActiveTheme(gi)} onFocus={()=>setActiveTheme(gi)} tabIndex={0} key={g.theme}><header><span>0{gi+1}</span><h3>{g.theme}</h3></header><ol start={commitmentGroups.slice(0,gi).reduce((n,x)=>n+x.items.length,1)}>{g.items.map(([t,d])=><li key={t}><h4>{t}</h4><p>{d}</p></li>)}</ol></article>)}</div></section>

  <section className="promise"><p>My promise to members</p>{['Listen before leading.','Collaborate before deciding.','Act with transparency.','Create opportunities.'].map((x,i)=><div key={x}><span>0{i+1}</span><h2>{x}</h2></div>)}</section>

  <section id="research" className="professional"><SectionTitle number="05" title="Practice & research"/><div className="professionalExperience"><div className="professionalIndex">{professionalItems.map((item,i)=><button type="button" aria-pressed={activeProfessional===i} className={activeProfessional===i?'active':''} onMouseEnter={()=>setActiveProfessional(i)} onFocus={()=>setActiveProfessional(i)} onClick={()=>setActiveProfessional(i)} key={item[0]}><span>0{i+1}</span><div><h3>{item[0]}</h3><strong>{item[1]}</strong><p>{item[2]}</p></div></button>)}</div><aside className="professionalDetail" aria-live="polite"><span>0{activeProfessional+1}</span><h3>{professionalItems[activeProfessional][0]}</h3><strong>{professionalItems[activeProfessional][1]}</strong><p>{professionalItems[activeProfessional][2]}</p></aside></div><div className="researchRail" aria-label="Research interests">{research.map(x=><span tabIndex={0} key={x}>{x}</span>)}</div></section>

  <section id="education" className="education band"><SectionTitle number="06" title="Education"/><div className="educationLine">{profile.education.map(e=><article key={e.year}><span>{e.year}</span><h3>{e.degree}</h3><p>{e.institution}</p></article>)}</div><p className="phd">Ph.D. research focus: Environmental Psychology, spatial cognition, human navigation and wayfinding behaviour.</p></section>

  {siteConfig.electionMode?<section className="newChapter"><p>A new chapter for IIA Telangana<br/><strong>Election · {siteConfig.electionDates}</strong></p><div><h2>Together, let us build a Chapter that is <em>inclusive, inspiring and accountable.</em></h2><blockquote>With experience as my foundation, learning as my constant companion and service as my commitment, I seek the opportunity to continue serving our fraternity.</blockquote><p>Dr. Aditya Singaraju<br/>Candidate for Chairperson · IIA Telangana Chapter</p></div></section>:null}

  </main><footer><a className="brand inverse" href="#top"><span>AS</span><b>Dr. Aditya<br/>Singaraju</b></a><p>{profile.roles}</p><p>© {new Date().getFullYear()} Dr. Aditya Singaraju</p></footer></>}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
