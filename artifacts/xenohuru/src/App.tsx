import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ArrowUpRight, CheckCircle2, ChevronDown, Code2, Database, ExternalLink, FileText, LockKeyhole, MapPin, Menu, Moon, Search, ShieldCheck, Sun, UsersRound, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import africaAsset from '@assets/africa-network.svg';
import markmapAsset from '@assets/markmap.svg';

const queryClient = new QueryClient();

type Article = { slug: string; category: string; title: string; excerpt: string; date: string; readTime: string; author?: string };
const articles: Article[] = [
  { slug: 'tourism-data-pipelines', category: 'Infrastructure', title: "Designing Tourism Data Pipelines That Don't Break", excerpt: 'A field guide to ingesting, cleaning, and serving unreliable tourism data across borders.', date: 'May 18, 2026', readTime: '8 min read', author: 'Erick G.' },
  { slug: 'building-reliable-payment-rails', category: 'Payments', title: 'Building Reliable Payment Rails for African Operators', excerpt: 'What changes when a payment system must survive intermittent networks, multiple currencies, and real people.', date: 'May 11, 2026', readTime: '11 min read', author: 'Erick G.' },
  { slug: 'ai-itinerary-optimization', category: 'AI / ML', title: 'AI for Itinerary Optimization at the Edge', excerpt: 'Making recommendations useful when the model, the map, and the traveller are all moving.', date: 'May 04, 2026', readTime: '7 min read', author: 'Neema K.' },
  { slug: 'state-of-tourism-data', category: 'Data', title: 'The State of Tourism Data in East Africa', excerpt: 'A map of the sources, gaps, and quiet infrastructure holding a region together.', date: 'Apr 25, 2026', readTime: '13 min read', author: 'Erick G.' },
  { slug: 'open-apis-for-operators', category: 'APIs', title: 'Why Open APIs Matter to Small Operators', excerpt: 'A practical case for public interfaces in an ecosystem built from many small businesses.', date: 'Apr 18, 2026', readTime: '6 min read', author: 'Asha M.' },
  { slug: 'offline-first-bookings', category: 'Infrastructure', title: 'The Case for Offline-First Booking Flows', excerpt: 'Designing for the two minutes when the network disappears at the exact wrong time.', date: 'Apr 12, 2026', readTime: '9 min read', author: 'Erick G.' },
  { slug: 'sovereign-ai-infrastructure', category: 'AI / ML', title: 'Sovereign AI Is an Infrastructure Decision', excerpt: 'Models are only one small part of deciding who gets to build and benefit from intelligence.', date: 'Apr 05, 2026', readTime: '10 min read', author: 'Neema K.' },
  { slug: 'operator-data-contracts', category: 'Data', title: 'Data Contracts for Human-Sized Teams', excerpt: 'A gentler way to bring schema discipline to teams that cannot hire a data platform department.', date: 'Mar 28, 2026', readTime: '8 min read', author: 'Asha M.' },
  { slug: 'mapping-the-visitor-economy', category: 'Research', title: 'Mapping the Visitor Economy', excerpt: 'What a useful map reveals when tourism is treated as an interconnected civic system.', date: 'Mar 19, 2026', readTime: '12 min read', author: 'Erick G.' },
];

const projects = [
  { name: 'xenohuru-payments', category: 'Payments', description: 'Payment orchestration for operators working across currencies, rails, and uncertain connectivity.', stars: 287, forks: 46, updated: '2 days ago', languages: [['Python', '#e6a646'], ['TypeScript', '#55c5ae']] },
  { name: 'itinerary-engine', category: 'AI / ML', description: 'An AI-assisted itinerary engine that keeps its recommendations explainable and useful offline.', stars: 196, forks: 31, updated: '6 days ago', languages: [['TypeScript', '#55c5ae'], ['Python', '#e6a646']] },
  { name: 'tourism-data-kit', category: 'Data', description: 'Schemas, validation, and small utilities for making regional tourism data interoperable.', stars: 153, forks: 24, updated: '1 week ago', languages: [['Go', '#59b7d3'], ['Python', '#e6a646']] },
  { name: 'operator-dashboard', category: 'APIs', description: 'A calm control room for small operators: bookings, settlement, and the health of their data.', stars: 142, forks: 18, updated: '2 weeks ago', languages: [['TypeScript', '#55c5ae']] },
];

const communityMembers = [
  { initials: 'CG', name: 'Kelvin Mbilinyi', role: 'Software engineer', focus: 'Payments, data contracts, and the long view of African infrastructure.' },
  { initials: 'NK', name: 'Neema K.', role: 'AI / ML builder', focus: 'Contextual intelligence, explainable recommendations, and useful tools at the edge.' },
  { initials: 'AM', name: 'Asha M.', role: 'Data systems contributor', focus: 'Open schemas and interfaces that help small operators work as one ecosystem.' },
];

function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('xenohuru-theme') !== 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('xenohuru-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return <button className="xh-icon-btn" onClick={() => setDark((value) => !value)} aria-label={dark ? 'Use light theme' : 'Use dark theme'} data-testid="button-theme-toggle">{dark ? <Sun size={15} /> : <Moon size={15} />}</button>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const links = [['Articles', '/articles'], ['Projects', '/projects'], ['Community', '/community'], ['About', '/about'], ['Newsletter', '/newsletter']];
  return <>
    <header className="xh-nav">
      <div className="xh-container xh-nav-inner">
        <Link href="/" className="xh-logo" data-testid="link-logo"><span className="xh-logo-mark"><span>×</span></span>XENOHURU</Link>
        <nav className="xh-nav-links" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={location === href ? 'active' : ''} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</Link>)}
        </nav>
        <div className="xh-nav-actions">
          <Link href="/search" className="xh-icon-btn" aria-label="Search XENOHURU" data-testid="link-search"><Search size={15} /></Link>
          <ThemeToggle />
          <button className="xh-menu-btn" onClick={() => setOpen(true)} aria-label="Open navigation" data-testid="button-mobile-menu"><Menu size={18} /></button>
        </div>
      </div>
    </header>
    {open && <div className="xh-mobile-overlay">
      <div className="xh-nav-inner">
        <Link href="/" className="xh-logo" onClick={() => setOpen(false)}><span className="xh-logo-mark"><span>×</span></span>XENOHURU</Link>
        <button className="xh-icon-btn" onClick={() => setOpen(false)} aria-label="Close navigation" data-testid="button-close-mobile-menu"><X size={18} /></button>
      </div>
      <nav aria-label="Mobile navigation">
        {links.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)} style={{ animationDelay: `${index * 70}ms` }} data-testid={`link-mobile-${label.toLowerCase()}`}>{label}<span style={{ color: 'hsl(var(--primary))', marginLeft: 12 }}>↗</span></Link>)}
      </nav>
      <div className="xh-mobile-footer"><span>GitHub&nbsp;&nbsp; X / @xenohuru</span><span>Built in Tanzania</span></div>
    </div>}
  </>;
}

function PolicyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('xenohuru-policy-seen')) setOpen(true);
  }, []);

  const accept = () => {
    localStorage.setItem('xenohuru-policy-seen', '1');
    setOpen(false);
  };

  if (!open) return null;

  return <div className="xh-policy-backdrop" role="presentation">
    <section className="xh-policy-modal" role="dialog" aria-modal="true" aria-labelledby="policy-title">
      <div className="xh-policy-topline"><span className="xh-kicker">Before you enter the commons</span><span className="xh-policy-status"><span className="xh-policy-pulse" /> privacy first</span></div>
      <h2 id="policy-title">Your data should never be a toll road.</h2>
      <p className="xh-policy-intro">XENOHURU is built around open infrastructure and civilian ownership. Here is what this MVP does today, and what we intend to protect before production.</p>
      <div className="xh-policy-grid">
        <div><CheckCircle2 size={16} /><strong>No sale of personal data</strong><span>We do not sell or trade your email address.</span></div>
        <div><LockKeyhole size={16} /><strong>Security is explicit</strong><span>Production data will use encrypted transport, encrypted storage, and access controls.</span></div>
        <div><FileText size={16} /><strong>This is an MVP</strong><span>Newsletter forms currently show a local confirmation and do not send your email to a server.</span></div>
        <div><ShieldCheck size={16} /><strong>No public email ledger</strong><span>Personal emails will never be written to a public blockchain. Privacy comes before novelty.</span></div>
      </div>
      <div className="xh-policy-actions">
        <Link href="/privacy" className="xh-btn xh-btn-ghost" onClick={() => setOpen(false)}>Read privacy policy</Link>
        <Link href="/terms" className="xh-btn xh-btn-ghost" onClick={() => setOpen(false)}>Terms & conditions</Link>
        <button className="xh-btn xh-btn-primary" onClick={accept}>Accept & continue <ArrowUpRight size={14} /></button>
      </div>
      <p className="xh-policy-fineprint">By continuing, you acknowledge this notice. The policy will be updated before any production collection of personal data.</p>
    </section>
  </div>;
}

function Footer() {
  return <footer className="xh-footer">
    <div className="xh-container xh-footer-inner">
      <span><span className="xh-footer-mark">×</span> 2026 XENOHURU</span>
      <div className="xh-footer-links"><Link href="/articles" data-testid="link-footer-articles">Articles</Link><Link href="/projects" data-testid="link-footer-projects">Projects</Link><Link href="/community" data-testid="link-footer-community">Community</Link><Link href="/about" data-testid="link-footer-about">About</Link><Link href="/newsletter" data-testid="link-footer-newsletter">Newsletter</Link><Link href="/privacy" data-testid="link-footer-privacy">Privacy</Link><Link href="/terms" data-testid="link-footer-terms">Terms</Link></div>
      <span>Open infrastructure / <span className="xh-footer-mark">TZ</span></span>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="xh-shell noise"><Header /><main className="xh-main">{children}</main><Footer /><PolicyNotice /></div>;
}

function NewsletterForm({ boxed = false }: { boxed?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes('@')) { setStatus('Please enter a valid email address.'); return; }
    setStatus('You are on the list. The next field note arrives Monday.');
    setEmail('');
  };
  return <form className={boxed ? 'xh-form-large' : ''} onSubmit={submit} noValidate>
    <div className="xh-form"><input className="xh-input" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); }} placeholder="you@somewhere.org" aria-label="Email address" data-testid="input-newsletter-email" /><button className="xh-btn xh-btn-primary" type="submit" data-testid="button-newsletter-submit">Subscribe <ArrowUpRight size={14} /></button></div>
    {status && <div className={`xh-form-feedback ${status.startsWith('Please') ? 'error' : ''}`} role="status" data-testid="status-newsletter">{status}</div>}
  </form>;
}

function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  return <Link href={`/articles/${article.slug}`} className={`xh-card ${compact ? 'compact' : ''}`} data-testid={`card-article-${article.slug}`}>
    <span className="xh-kicker">{article.category}</span>
    <h3>{article.title}</h3>
    <p>{article.excerpt}</p>
    <div className="xh-card-meta"><span>{article.date}</span><span>{article.readTime}</span></div>
  </Link>;
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const [notice, setNotice] = useState('');
  return <div className="xh-project-card" data-testid={`card-project-${project.name}`}>
    <div className="xh-project-top"><span className="xh-project-name">{project.name}</span><span className="xh-star">★ {project.stars}</span></div>
    <p>{project.description}</p>
    <div className="xh-tags">{project.languages.map(([language, color]) => <span className="xh-tag" key={language}><span style={{ color, marginRight: 5 }}>●</span>{language}</span>)}</div>
    <div className="xh-card-meta"><span>★ {project.stars} stars</span><span>⑂ {project.forks} forks</span><span>Updated {project.updated}</span></div>
    <div className="xh-feature-actions"><button className="xh-btn xh-btn-ghost" onClick={() => setNotice(`The ${project.name} source is being prepared for the public repository.`)} data-testid={`button-code-${project.name}`}>View Code <ExternalLink size={13} /></button><button className="xh-btn xh-btn-primary" onClick={() => setNotice(`A live sandbox for ${project.name} will open here soon.`)} data-testid={`button-demo-${project.name}`}>Live Demo <ArrowUpRight size={13} /></button></div>
    {notice && <div className="xh-form-feedback" role="status" data-testid={`status-project-${project.name}`}>{notice}</div>}
  </div>;
}

function Architecture({ large = false }: { large?: boolean }) {
  return <div className={`xh-architecture ${large ? 'large' : ''}`} role="img" aria-label="Service architecture diagram">
    <div className="xh-arch-node">Operators</div><div className="xh-arch-line" /><div className="xh-arch-node hot">API Gateway</div><div className="xh-arch-line" /><div className="xh-arch-node">Data Layer</div><div className="xh-arch-line" /><div className="xh-arch-node hot">Open Services</div>
  </div>;
}

function Home() {
  return <Shell>
    <section className="xh-hero"><div className="xh-container xh-hero-grid">
      <div className="xh-hero-copy">
        <div className="xh-kicker">Engineering journal / 01</div>
        <h1 className="xh-display">Build the <em>infrastructure</em> of what comes next.</h1>
        <p className="xh-lede">A quiet, ambitious journal and open-source community for the builders shaping Africa’s AI, data, and civic systems.</p>
        <div className="xh-button-row"><Link href="/articles/tourism-data-pipelines" className="xh-btn xh-btn-primary" data-testid="link-hero-read">Read the protocol <ArrowUpRight size={14} /></Link><Link href="/projects" className="xh-btn xh-btn-ghost" data-testid="link-hero-projects">Explore projects</Link></div>
      </div>
      <div className="xh-hero-art" aria-label="Animated network map of Africa" role="img">
        <div className="xh-map-grid" />
        <div className="xh-africa-halo" />
        <div className="xh-africa-stage">
          <img className="xh-africa-map" src="https://res.cloudinary.com/dyeh76tjz/image/upload/v1786554509/ChatGPT_Image_Aug_12_2026_02_35_23_PM_rkvgqw.png" alt="A luminous network map of Africa" />
          <span className="xh-africa-scan" />
        </div>
        {/* <div className="xh-node-center">AFRICA<br /><span style={{ color: 'hsl(var(--muted-foreground))' }}>connected systems</span></div> */}
        <i className="xh-orbit-node" style={{ top: '20%', left: '28%' }} /><i className="xh-orbit-node teal" style={{ top: '29%', right: '17%' }} /><i className="xh-orbit-node" style={{ bottom: '20%', left: '21%' }} /><i className="xh-orbit-node teal" style={{ bottom: '14%', right: '27%' }} />
        <span className="xh-node-line" style={{ top: '33%', left: '29%', transform: 'rotate(25deg)' }} /><span className="xh-node-line" style={{ top: '42%', right: '17%', transform: 'rotate(153deg)' }} />
        <span className="xh-hero-note">EAST AFRICA / OPEN BY DEFAULT</span>
      </div>
    </div></section>
    <section className="xh-section xh-section-tint"><div className="xh-container">
      <div className="xh-section-head"><div><div className="xh-kicker">Dispatches from the field</div><h2>Latest articles</h2></div><Link href="/articles" className="xh-arrow-link" data-testid="link-home-all-articles">View all articles ↗</Link></div>
      <div className="xh-card-grid">{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
    </div></section>
    <section className="xh-section"><div className="xh-container">
      <div className="xh-section-head"><div><div className="xh-kicker">Open by default</div><h2>Featured projects</h2></div><Link href="/projects" className="xh-arrow-link" data-testid="link-home-all-projects">View all projects ↗</Link></div>
      <div className="xh-project-grid">{projects.slice(0, 2).map((project) => <ProjectCard key={project.name} project={project} />)}</div>
    </div></section>
    <section className="xh-section compact xh-dark-band"><div className="xh-container xh-newsletter-strip"><div><div className="xh-kicker">The field note</div><h2>Technical analysis for people building the long way.</h2><p>No fluff. No spam. Just engineering.</p></div><NewsletterForm /></div></section>
    <section className="xh-section"><div className="xh-container"><div className="xh-section-head"><div><div className="xh-kicker">The living map</div><h2>Infrastructure is a network.</h2><p>Systems become durable when their relationships are visible.</p></div></div><div className="xh-visual-panel"><img src={markmapAsset} alt="XENOHURU infrastructure map" /><span className="xh-visual-caption">FIG 01 / THE XENOHURU PROTOCOL</span></div></div></section>
  </Shell>;
}

function ArticlesPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const categories = ['All', 'Payments', 'AI / ML', 'Data', 'Infrastructure', 'APIs'];
  const visible = useMemo(() => articles.filter((article) => (filter === 'All' || article.category === filter) && `${article.title} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return <Shell><div className="xh-container xh-page-head"><div className="xh-kicker">The publication / 09 records</div><h1>Articles</h1><p>Technical deep-dives into the payment rails, data systems, and AI infrastructure shaping African tourism.</p><div className="xh-search-box"><Search size={15} color="hsl(var(--muted-foreground))" /><input className="xh-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal..." aria-label="Search articles" data-testid="input-articles-search" /></div><div className="xh-filter-row">{categories.map((category) => <button key={category} className={`xh-filter ${filter === category ? 'active' : ''}`} onClick={() => setFilter(category)} data-testid={`button-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}</div></div><section className="xh-section"><div className="xh-container">{visible.length > 0 ? <div className="xh-card-grid">{visible.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="xh-empty"><Database size={24} color="hsl(var(--primary))" /><h2>No dispatches found</h2><p>Try a different phrase or clear the category filter.</p><button className="xh-btn xh-btn-ghost" onClick={() => { setQuery(''); setFilter('All'); }} data-testid="button-clear-article-search">Clear filters</button></div>}</div></section></Shell>;
}

function ArticlePage() {
  return <Shell><div className="xh-container"><header className="xh-article-header"><div className="xh-kicker">Infrastructure / Field note 001</div><h1>Designing Tourism Data Pipelines That Don’t Break</h1><div className="xh-byline"><span className="xh-avatar">CG</span><strong style={{ color: 'hsl(var(--foreground))' }}>Erick G.</strong><span>·</span><span>May 18, 2026</span><span>·</span><span>8 min read</span></div></header><div className="xh-article-layout"><aside className="xh-toc"><strong>ON THIS PAGE</strong><a href="#problem">01 / The problem</a><a href="#architecture">02 / Architecture overview</a><a href="#ingestion">03 / Data ingestion</a><a href="#processing">04 / Processing layer</a><a href="#lessons">05 / Lessons learned</a></aside><article className="xh-article-body"><div className="xh-article-figure"><Architecture large /><div className="xh-figcaption">Figure 1: Tourism data pipeline architecture — boundaries before features.</div></div><p>Tourism data is messy. Operators use different systems. APIs change without warning. Coverage is uneven by design. The first version of a data platform is rarely a clean graph of tables; it is a negotiation with reality.</p><p>That does not mean we should accept brittle systems. It means our architecture needs to make <strong>uncertainty observable, isolated, and recoverable.</strong></p><h2 id="problem">01. The problem is not the data</h2><p>When we began mapping the visitor economy in East Africa, the most common advice was to find a better source. There is no single source. There are thousands of useful fragments: booking exports, border data, park permits, weather signals, operator notes, and the context carried in a guide’s head.</p><blockquote>Good infrastructure does not remove the mess. It gives the mess somewhere safe to go.</blockquote><h2 id="architecture">02. Architecture overview</h2><p>Our pipeline separates the work into three boundaries: <strong>capture</strong>, where raw events enter; <strong>transform</strong>, where meaning is added; and <strong>serve</strong>, where a consumer gets a stable contract. Each boundary can fail without taking down the others.</p><div className="xh-code"><span className="cm">// A source is allowed to be late, incomplete, or duplicated.</span><br /><span className="kw">async function</span> <span className="fn">ingestSource</span>(source: Source) {'{'}<br />&nbsp;&nbsp;<span className="kw">try</span> {'{'}<br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">const</span> event = <span className="kw">await</span> source.read();<br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> normalize(event, {'{'} sourceId: source.id {'}'});<br />&nbsp;&nbsp;{'}'} <span className="kw">catch</span> (error) {'{'}<br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">await</span> quarantine.write({'{'} source, error {'}'});<br />&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> {'{'} status: <span className="str">'deferred'</span> {'}'};<br />&nbsp;&nbsp;{'}'}<br />{'}'}</div><h2 id="ingestion">03. Data ingestion</h2><p>We normalize everything at the edge and aggressively preserve the original payload. A normalized record is useful; a normalized record that has lost its provenance is a future debugging session waiting to happen.</p><div className="xh-data-table"><table><thead><tr><th>Signal</th><th>Cadence</th><th>Contract</th><th>Failure mode</th></tr></thead><tbody><tr><td>Operator booking</td><td>Event</td><td>Booking.v2</td><td>Quarantine</td></tr><tr><td>Park permit</td><td>Daily</td><td>Permit.v1</td><td>Backfill</td></tr><tr><td>Weather context</td><td>Hourly</td><td>Forecast.v3</td><td>Stale flag</td></tr></tbody></table></div><h2 id="processing">04. Processing layer</h2><p>Processing is where we resist the temptation to build a single brilliant job. Small, replayable steps are easier to inspect and cheaper to replace. The pipeline emits a health record alongside every useful record.</p><h2 id="lessons">05. Lessons learned</h2><ul style={{ listStyle: 'none', padding: 0 }}><li>— Preserve provenance before improving presentation.</li><li>— Treat late data as a normal state, not an exception.</li><li>— Build the contract with the smallest operator in the room.</li></ul><div className="xh-author"><div className="xh-avatar">CG</div><div><h3>Erick G.</h3><p style={{ color: 'hsl(var(--primary))' }}>Software Eng.</p><p>Building payment infrastructure and AI systems for African tourism. Based in Arusha, Tanzania.</p><p style={{ marginTop: 10 }}>GitHub&nbsp;&nbsp; / &nbsp;&nbsp;X / @Erickgodson</p></div></div><div className="xh-inline-newsletter"><h3>Keep the signal.</h3><p>Get the next engineering field note in your inbox.</p><NewsletterForm /></div></article></div><section className="xh-section compact"><div className="xh-section-head"><div><div className="xh-kicker">Continue reading</div><h2>Related stories</h2></div></div><div className="xh-card-grid">{articles.slice(1, 4).map((article) => <ArticleCard compact key={article.slug} article={article} />)}</div></section></div></Shell>;
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [notice, setNotice] = useState('');
  const categories = ['All', 'Payments', 'AI / ML', 'Data', 'APIs'];
  const visible = projects.filter((project) => filter === 'All' || project.category === filter);
  return <Shell><div className="xh-container xh-page-head"><div className="xh-kicker">The commons / 04 systems</div><h1>Projects</h1><p>Open-source infrastructure for an AI-first African tourism ecosystem. Built to be forked, understood, and improved.</p><div className="xh-filter-row">{categories.map((category) => <button key={category} className={`xh-filter ${filter === category ? 'active' : ''}`} onClick={() => setFilter(category)} data-testid={`button-project-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}</div></div><section className="xh-section compact"><div className="xh-container"><div className="xh-featured"><div className="xh-star">★ 412 / reference architecture</div><h2>xenohuru-platform</h2><p>Modular backend primitives for tourism operators, APIs, and marketplaces. One stable surface for many different futures.</p><div className="xh-tags"><span className="xh-tag">Python</span><span className="xh-tag">Django</span><span className="xh-tag">GraphQL</span><span className="xh-tag">PostgreSQL</span></div><Architecture large /><div className="xh-feature-actions"><button className="xh-btn xh-btn-ghost" onClick={() => setNotice('The platform source is being prepared for the public repository.')} data-testid="button-featured-code">View code <Code2 size={14} /></button><button className="xh-btn xh-btn-primary" onClick={() => setNotice('A live sandbox for xenohuru-platform will open here soon.')} data-testid="button-featured-demo">Live demo <ArrowUpRight size={14} /></button></div>{notice && <div className="xh-form-feedback" role="status" data-testid="status-featured-project">{notice}</div>}</div></div></section><section className="xh-section compact"><div className="xh-container"><div className="xh-section-head"><div><div className="xh-kicker">Small pieces / strong joints</div><h2>Build surface</h2></div></div><div className="xh-project-grid">{visible.map((project) => <ProjectCard key={project.name} project={project} />)}</div></div></section><section className="xh-section compact xh-section-tint"><div className="xh-container" style={{ textAlign: 'center' }}><div className="xh-kicker">Have a tourism infrastructure problem?</div><h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-.07em', margin: '13px 0' }}>Let’s build it.</h2><Link href="/about#join" className="xh-btn xh-btn-primary" data-testid="link-projects-join">Get in touch <ArrowUpRight size={14} /></Link></div></section></Shell>;
}

function AboutPage() {
  const principles = [['01', 'Open source as civilization', 'We build in the open so the next builder starts further ahead.'], ['02', 'Build for Africa first', 'African problems deserve African-first infrastructure, not a reduced version of somewhere else.'], ['03', 'Long-term thinking', 'We think in decades, not quarters. The useful work outlives the person who started it.']];
  return <Shell><section className="xh-container xh-about-hero"><div><div className="xh-kicker">A note on intent</div><h1>We build <em style={{ color: 'hsl(var(--primary))', fontFamily: "'Instrument Serif', serif" }}>roads,</em><br />not walls.</h1><p className="xh-lede">XENOHURU is an engineering publication and open-source initiative for people building the digital infrastructure of African tourism — and the civic systems around it.</p><Link href="#join" className="xh-btn xh-btn-primary" data-testid="link-about-join">Join the lineage <ArrowUpRight size={14} /></Link></div><div className="xh-timeline">{[['2026', 'The beginning'], ['2028', 'The network'], ['2036', 'The platform'], ['2056', 'The ecosystem'], ['2066', 'The legacy']].map(([year, label]) => <div className="xh-time-item" key={year}><strong>{year}</strong><span>{label}</span></div>)}</div></section><section className="xh-manifesto"><div className="xh-container"><div className="xh-kicker">The manifesto</div><blockquote>“Infrastructure is a public good. We ship in the open, share what we learn, and build for the next 100 years.”</blockquote><cite>— The Xenohuru Protocol</cite></div></section><section className="xh-section"><div className="xh-container"><div className="xh-profile"><div className="xh-avatar">CG</div><div><h2>Erick G.</h2><div className="title">Software Eng.</div><p>Software engineer and infrastructure builder focused on payments, data, and AI systems for African tourism. CS student, open-source contributor, and believer in technological sovereignty.</p><p><MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />Arusha, Tanzania &nbsp;&nbsp; <a href="mailto:info@xenohuru.com" style={{ color: 'hsl(var(--primary))' }}>Email →</a></p></div></div></div></section><section className="xh-section compact xh-section-tint"><div className="xh-container"><div className="xh-section-head"><div><div className="xh-kicker">Builders in the room</div><h2>Community team</h2><p>A growing group of builders turning open questions into durable public infrastructure.</p></div><Link href="/community" className="xh-arrow-link">Meet the community ↗</Link></div><div className="xh-team-grid">{communityMembers.map((member) => <div className="xh-team-card" key={member.name}><div className="xh-team-avatar">{member.initials}</div><div><h3>{member.name}</h3><div className="xh-team-role">{member.role}</div><p>{member.focus}</p></div></div>)}</div></div></section><div className="xh-stats"><div className="xh-stat"><strong>40+</strong><span>field notes</span></div><div className="xh-stat"><strong>5</strong><span>open projects</span></div><div className="xh-stat"><strong>12</strong><span>operators served</span></div><div className="xh-stat"><strong>$50K+</strong><span>value processed</span></div></div><section className="xh-section"><div className="xh-container"><div className="xh-section-head"><div><div className="xh-kicker">The rules of the road</div><h2>Our principles</h2></div></div><div className="xh-principles">{principles.map(([number, title, copy]) => <div className="xh-principle" key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section><section className="xh-section compact xh-section-tint" id="join"><div className="xh-container" style={{ maxWidth: 680, textAlign: 'center' }}><div className="xh-kicker">Join the lineage</div><h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', letterSpacing: '-.07em', margin: '14px 0' }}>Bring a question. Leave a road.</h2><p style={{ color: 'hsl(var(--muted-foreground))' }}>Get updates on what we’re building and how you can contribute.</p><NewsletterForm boxed /></div></section></Shell>;
}

function CommunityPage() {
  return <Shell><section className="xh-community-hero"><div className="xh-container"><div className="xh-kicker">The people behind the signal</div><h1>Build in public.<br /><em>Build together.</em></h1><p>Our community is made of engineers, operators, researchers, and teachers who believe the best infrastructure is shared before it is polished.</p><div className="xh-button-row"><Link href="/about#join" className="xh-btn xh-btn-primary">Join the lineage <ArrowUpRight size={14} /></Link><Link href="/projects" className="xh-btn xh-btn-ghost">Explore the commons</Link></div></div></section><section className="xh-section"><div className="xh-container"><div className="xh-section-head"><div><div className="xh-kicker">Current collaborators</div><h2>Community team</h2><p>Different disciplines. One commitment to open, useful systems.</p></div><UsersRound size={28} color="hsl(var(--primary))" /></div><div className="xh-team-grid xh-team-grid-large">{communityMembers.map((member) => <article className="xh-team-card" key={member.name}><div className="xh-team-avatar">{member.initials}</div><div><h3>{member.name}</h3><div className="xh-team-role">{member.role}</div><p>{member.focus}</p><a className="xh-arrow-link" href={`mailto:${member.name.toLowerCase().replace(/[^a-z]+/g, '.')}@xenohuru.org`}>Connect ↗</a></div></article>)}</div></div></section><section className="xh-section compact xh-section-tint"><div className="xh-container xh-community-principles"><div><div className="xh-kicker">How we work</div><h2>A road is stronger when more people can repair it.</h2></div><div className="xh-community-list"><p><span>01</span>Ship the smallest useful thing.</p><p><span>02</span>Leave the map clearer than you found it.</p><p><span>03</span>Make room for the next builder.</p></div></div></section></Shell>;
}

function LegalPage({ title, kicker, children }: { title: string; kicker: string; children: ReactNode }) {
  return <Shell><div className="xh-container xh-legal"><div className="xh-kicker">{kicker}</div><h1>{title}</h1><p className="xh-legal-updated">MVP draft / Last updated August 12, 2026</p><div className="xh-legal-disclaimer"><ShieldCheck size={18} /><div><strong>Informational draft — not legal advice.</strong><span>Have a qualified lawyer review this document for the jurisdictions where XENOHURU operates before collecting personal data or launching production services.</span></div></div><div className="xh-legal-body">{children}</div><div className="xh-legal-footer"><Link href="/privacy">Privacy policy ↗</Link><Link href="/terms">Terms & conditions ↗</Link><a href="mailto:info@xenohuru.com">Contact the team ↗</a></div></div></Shell>;
}

function PrivacyPage() {
  return <LegalPage title="Privacy & security" kicker="The trust layer / 01">
    <p className="xh-legal-lede">XENOHURU is an AI-first builder community and open infrastructure ecosystem for Africa. We want privacy to be part of the architecture, not a paragraph added after the fact.</p>
    <h2>What this MVP does today</h2>
    <p>This preview is a static website. The newsletter forms currently validate an email address in your browser and show a local confirmation; they do not send your email to a server. We do not use tracking pixels, advertising profiles, or a public analytics identity in this MVP.</p>
    <h2>What we may collect in production</h2>
    <p>If you choose to join the newsletter or community, we may collect the information you intentionally provide, such as your email address, name, message, or contribution. We will use it to deliver updates, respond to requests, operate the community, and keep the service safe.</p>
    <h2>Security commitments</h2>
    <div className="xh-legal-callout"><LockKeyhole size={19} /><div><strong>Planned before production collection</strong><span>Encrypted transport, encrypted storage, least-privilege access, retention limits, audit logs, and a clear deletion path.</span></div></div>
    <p>Blockchain is not a default storage layer for personal data. Email addresses and other directly identifying information will never be written to a public blockchain. If a tamper-evident system is useful for infrastructure provenance, it would use non-identifying references only and would be reviewed before launch.</p>
    <h2>Your choices</h2>
    <p>You will be able to ask what personal data we hold, correct it, export it where practical, or request deletion. You can unsubscribe from communications at any time. Requests can be sent to <a href="mailto:info@xenohuru.com">info@xenohuru.com</a>.</p>
    <h2>Changes</h2>
    <p>We will update this page before enabling production data collection and will explain material changes in a visible way. The final policy will identify the legal entity, service providers, retention periods, and governing privacy law.</p>
  </LegalPage>;
}

function TermsPage() {
  return <LegalPage title="Terms & conditions" kicker="The trust layer / 02">
    <p className="xh-legal-lede">These draft terms describe the basic rules for using the XENOHURU publication, open-source projects, and builder community.</p>
    <h2>1. Using XENOHURU</h2>
    <p>By accessing XENOHURU, you agree to use the site lawfully, respect other builders, and avoid actions that could disrupt the service, compromise another person’s privacy, or misrepresent your relationship with the project.</p>
    <h2>2. Open-source work</h2>
    <p>Code and project materials are made available under the license stated with each repository. The XENOHURU name, marks, editorial work, and site design remain protected unless a separate license says otherwise. Review the repository license before using a project in production.</p>
    <h2>3. Community contributions</h2>
    <p>You keep ownership of material you submit. By sharing a contribution with the community, you grant XENOHURU a limited permission to display, reproduce, and distribute it for operating and promoting the community, subject to the license or terms you choose to attach. Do not submit confidential information or personal data belonging to someone else.</p>
    <h2>4. Technical information</h2>
    <p>Articles, AI-related material, architecture notes, and project demonstrations are educational and informational. They are not legal, financial, medical, security, or operational advice, and they do not create a service-level promise or guarantee of fitness for a particular use.</p>
    <h2>5. Availability and changes</h2>
    <p>XENOHURU is an evolving MVP. Features may change, pause, or be removed as the community learns. We will make reasonable efforts to communicate material changes, but we do not promise uninterrupted availability.</p>
    <h2>6. Privacy and security</h2>
    <p>Our privacy approach is described in the <Link href="/privacy">Privacy & security policy</Link>. The current preview does not transmit newsletter emails to a backend. Production collection will not begin until the relevant data flows and protections are documented.</p>
    <h2>7. Contact and governing terms</h2>
    <p>Questions about these terms can be sent to <a href="mailto:info@xenohuru.com">info@xenohuru.com</a>. The final published version will identify the operating legal entity and governing jurisdiction. Until then, this page is a public MVP draft for transparency, not a substitute for a signed agreement.</p>
  </LegalPage>;
}

function NewsletterPage() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [['How often do you send newsletters?', 'Weekly. Every Monday morning East Africa Time.'], ['What kind of content do you publish?', 'Technical deep-dives into payment infrastructure, AI systems, data pipelines, and engineering decisions for African tourism.'], ['Is my data safe?', 'No tracking pixels, no data selling, no spam. Your email stays with us.'], ['Can I unsubscribe anytime?', 'Yes. One click. No questions asked.']];
  return <Shell><section className="xh-newsletter-hero"><div className="xh-container"><div className="xh-kicker">A weekly engineering dispatch</div><h1>The Engineering of <em>African Tourism</em></h1><p>Technical analysis, infrastructure deep-dives, and builder updates. No fluff. No spam.</p><NewsletterForm boxed /><div className="xh-trust"><span><Code2 size={14} /> Open source</span><span><ShieldCheck size={14} /> No tracking</span><span><MapPin size={14} /> African built</span></div></div></section><section className="xh-section xh-section-tint"><div className="xh-container xh-issues"><div className="xh-kicker">The archive</div><h2 style={{ fontSize: 'clamp(30px, 5vw, 46px)', letterSpacing: '-.07em', margin: '10px 0 28px' }}>Recent issues</h2>{[['#014', 'What reliable systems look like at the edge', 'May 18, 2026'], ['#013', 'The real cost of accepting payments in Arusha', 'May 11, 2026'], ['#012', 'A field guide to useful tourism data', 'May 04, 2026']].map(([number, title, date]) => <a className="xh-issue" href="#issue" key={number} data-testid={`link-issue-${number.replace('#', '')}`}><div><span className="xh-issue-number">{number}</span><span className="xh-issue-title">{title}</span></div><span className="xh-issue-date">{date}</span></a>)}<Link href="/articles" className="xh-arrow-link" style={{ display: 'inline-block', marginTop: 22 }} data-testid="link-newsletter-articles">View all field notes ↗</Link></div></section><section className="xh-section"><div className="xh-container xh-faq"><div className="xh-kicker">No hidden clauses</div><h2 style={{ fontSize: 'clamp(30px, 5vw, 46px)', letterSpacing: '-.07em', margin: '10px 0 25px' }}>FAQ</h2>{faqs.map(([question, answer], index) => <div className="xh-faq-item" key={question}><button className="xh-faq-trigger" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={15} style={{ transform: open === index ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} /></button>{open === index && <div className="xh-faq-answer">{answer}</div>}</div>)}</div></section></Shell>;
}

function SearchPage() {
  const [location] = useLocation();
  const initial = new URLSearchParams(location.split('?')[1] || '').get('q') || '';
  const [query, setQuery] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);
  const results = useMemo(() => [...articles.map((article) => ({ ...article, type: 'Article' })), ...projects.map((project) => ({ slug: project.name, title: project.name, excerpt: project.description, category: project.category, date: `★ ${project.stars}`, readTime: 'Project', type: 'Project' }))].filter((item) => `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(submitted.toLowerCase())), [submitted]);
  return <Shell><div className="xh-container xh-page-head"><div className="xh-kicker">The index / query interface</div><h1>Search</h1><p>Find a field note, an architecture decision, or a tool to fork.</p><form className="xh-search-box" onSubmit={(event) => { event.preventDefault(); setSubmitted(query); }}><Search size={15} color="hsl(var(--muted-foreground))" /><input className="xh-input" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try payments, data, AI..." aria-label="Search all content" data-testid="input-global-search" /><button type="submit" hidden>Search</button></form></div><section className="xh-section"><div className="xh-container">{submitted ? <><div className="xh-section-head"><div><div className="xh-kicker">Results for “{submitted}”</div><h2>{results.length} {results.length === 1 ? 'result' : 'results'}</h2></div></div>{results.length ? <div className="xh-card-grid">{results.map((item) => item.type === 'Article' ? <ArticleCard key={item.slug} article={item} /> : <div className="xh-card" key={item.slug}><span className="xh-kicker">{item.type} / {item.category}</span><h3>{item.title}</h3><p>{item.excerpt}</p><div className="xh-card-meta"><span>{item.date}</span><span>Open source</span></div></div>)}</div> : <div className="xh-empty"><Search size={25} color="hsl(var(--primary))" /><h2>The index is quiet.</h2><p>No result matched that query. Try a broader term.</p></div>}</> : <div className="xh-empty"><Search size={25} color="hsl(var(--primary))" /><h2>Start with a question.</h2><p>Search articles and projects across the XENOHURU commons.</p></div>}</div></section></Shell>;
}

function NotFound() {
  return <Shell><div className="xh-container xh-404"><div className="xh-404-number">404</div><div className="xh-404-network"><i className="xh-dot" /><i className="xh-dot" /><i className="xh-dot" /><i className="xh-dot" /><i className="xh-dot" /></div><h1>This node is offline.</h1><p>The page you’re looking for doesn’t exist or has moved to another part of the network.</p><div className="xh-button-row"><Link href="/articles" className="xh-btn xh-btn-primary" data-testid="link-404-articles">Back to articles <ArrowUpRight size={14} /></Link><Link href="/projects" className="xh-btn xh-btn-ghost" data-testid="link-404-projects">View projects</Link></div></div></Shell>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route path="/articles" component={ArticlesPage} /><Route path="/articles/tourism-data-pipelines" component={ArticlePage} /><Route path="/projects" component={ProjectsPage} /><Route path="/community" component={CommunityPage} /><Route path="/about" component={AboutPage} /><Route path="/newsletter" component={NewsletterPage} /><Route path="/privacy" component={PrivacyPage} /><Route path="/terms" component={TermsPage} /><Route path="/search" component={SearchPage} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;