'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Check,
  ChevronDown,
  CircleDot,
  Clipboard,
  Copy,
  GitBranch,
  HeartPulse,
  Menu,
  Moon,
  Network,
  Shield,
  Skull,
  Sparkles,
  Swords,
  Timer,
  Users,
  X,
  Zap,
} from 'lucide-react'

const INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1548731472146337822&permissions=120259095552&integration_type=0&scope=applications.commands+bot'
const SUPPORT_URL = 'https://discord.gg/P4mzRHJXqj'
const REPO_URL = 'https://github.com/rm5mg4hrgf-dot/nyxbot'
const LOGO_URL = 'https://d19ommfuo6icpr.cloudfront.net/image/6097.jpg'

const features = [
  ['Interactive Game Lobbies', 'Create and join matches through Discord interactions.', Network],
  ['Secret Roles', 'Private role information keeps every decision uncertain.', Shield],
  ['Night Actions', 'Mafia, Doctors, and Detectives make role-specific choices.', Moon],
  ['Timed Discussions & Voting', 'Debate, form alliances, and vote through structured phases.', Timer],
  ['Personality-Driven AI Opponents', 'Distinct AI players make role-appropriate decisions.', Brain],
  ['AI Storytelling', 'Optional narration, with built-in stories when AI is unavailable.', Sparkles],
  ['Persistent Game Recovery', 'SQLite storage supports recovery after a bot restart.', Zap],
  ['Private Player Discussions', 'Opt into a players-only thread for the match.', Users],
] as const

const roles = [
  ['Mafia', 'Move in the shadows. Coordinate, deceive, and survive the vote.', Skull, 'red'],
  ['Doctor', 'Keep the town alive through careful, hidden decisions.', HeartPulse, 'violet'],
  ['Detective', 'Follow the clues. Every investigation changes what you know.', CircleDot, 'blue'],
  ['Joker', 'A wild card presence that keeps the table guessing.', Sparkles, 'amber'],
  ['Townsperson', 'Trust your instincts, read the room, and find the truth.', Users, 'slate'],
] as const

const mangaPanels = [
  { title: '01 — NIGHTFALL', image: 'panel-night.svg', tag: 'THE CITY WAKES', line: 'When the lights go out, everyone has a secret.' },
  { title: '02 — THE SUSPECT', image: 'panel-suspect.svg', tag: 'SOMEONE KNOWS', line: 'One strange alibi can turn the whole room upside down.' },
  { title: '03 — THE VOTE', image: 'panel-vote.svg', tag: 'YOUR MOVE', line: 'Every vote changes the story. Choose your side.' },
  { title: '04 — PLOT TWIST', image: 'panel-reveal.svg', tag: 'ROLE REVEALED', line: 'The truth hits different when the mask comes off.' },
] as const

const commands = [
  ['/start', 'Begin a Mafia game session.'],
  ['/mafia create', 'Create a new Mafia lobby.'],
  ['/mafia configure', 'Configure an existing game.'],
  ['/mafia rules', 'View the available game rules.'],
  ['/mafia status', 'Check the current game status.'],
  ['/mafia opinion', 'Share an opinion during the match.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [phase, setPhase] = useState<'Discussion' | 'Voting' | 'Night'>('Discussion')
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [openCommand, setOpenCommand] = useState(0)
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.scroll-pop')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const copyCommand = async (command: string) => {
    await navigator.clipboard?.writeText(command)
    setCopied(command)
    setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="nyx-site">
      <div className="manga-progress" aria-hidden="true"><span /></div>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="NYX home"><span className="brand-mark"><Moon size={17} /></span><span>NYX</span></a>
        <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {['Features', 'Roles', 'Commands', 'How It Works', 'Community'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-cta" href={INVITE_URL}>Invite NYX <ArrowRight size={15} /></a>
        </nav>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> WELCOME TO THE UNDERWORLD</p>
          <h1>Welcome to<br /><em>the Mafia.</em></h1>
          <p className="hero-lede">Suit up, keep your secrets close, and watch your back. NYX brings cartoonish chaos, secret roles, suspicious votes, and late-night Mafia drama to your Discord server.</p>
          <div className="hero-actions"><a className="button button-primary" href={INVITE_URL}>Invite NYX to Discord <ArrowRight size={18} /></a><a className="button button-ghost" href="#features">Explore features <ArrowDown size={16} /></a></div>
          <a className="community-link" href={SUPPORT_URL}><span className="status-dot" /> Join the NYX community <ArrowRight size={13} /></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="moon-disc"><img src={LOGO_URL} alt="" /></div><div className="moon-haze" /><div className="mascot-wrap"><img src="/nyxbotwebsite/mafia-mascot.svg" alt="NYX cartoon Mafia cat mascot" /></div><div className="comic-bubble">KEEP YOUR<br />FRIENDS CLOSE.</div><div className="cartoon-tag">MAFIA CLUB ★</div><div className="comic-splat">BAM!</div>
          <div className="city city-back"><i /><i /><i /><i /><i /><i /></div><div className="city city-front"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="hero-coordinates">43° 02' 18" N<br />NIGHTFALL / 01</div><div className="hero-stamp">N<span>Y</span>X</div>
        </div>
        <a href="#features" className="scroll-cue" aria-label="Scroll to features"><span>Enter the underworld</span><ArrowDown size={17} /></a>
      </section>

      <section className="intro-band"><p>A cartoon crime-family social deduction game</p><div className="intro-rule" /><p>No snitches. Just strategy.</p></section>

      <section className="manga-story section" id="comic-story" aria-label="Interactive NYX anime comic story"><div className="manga-heading scroll-pop"><p className="eyebrow">SCROLL TO UNLOCK THE STORY / 00—04</p><h2>EVERY ROUND IS<br /><em>A PLOT TWIST.</em></h2><p>Tap a panel to jump into the scene. Keep scrolling—the story reveals itself as you go.</p><div className="manga-heading-stamp">NYX ORIGINAL COMIC ★</div></div><div className="manga-layout"><div className="manga-panel-grid">{mangaPanels.map((panel, index) => <button key={panel.title} type="button" className={`manga-panel scroll-pop ${activePanel === index ? 'panel-active' : ''}`} onClick={() => setActivePanel(index)} aria-pressed={activePanel === index}><span className="panel-number">{panel.title}</span><img src={`/nyxbotwebsite/manga/${panel.image}`} alt={panel.tag + ' original NYX anime comic illustration'} loading="lazy" /><span className="panel-caption">{panel.tag}<ArrowUpRight size={14} /></span><span className="panel-spark" aria-hidden="true">✦</span></button>)}</div><aside className="manga-dialogue scroll-pop" aria-live="polite"><div className="dialogue-top"><span className="dialogue-dot" /><span>SCENE SELECTED</span><span className="dialogue-count">0{activePanel + 1} / 04</span></div><p className="dialogue-kicker">{mangaPanels[activePanel].title}</p><h3>{mangaPanels[activePanel].tag}</h3><p>{mangaPanels[activePanel].line}</p><div className="dialogue-quote"><span>“</span><strong>{activePanel === 0 ? 'Trust no shadow.' : activePanel === 1 ? 'Everyone has a story.' : activePanel === 2 ? 'Make your move.' : 'Nothing is as it seems.'}</strong></div><div className="dialogue-controls"><button type="button" onClick={() => setActivePanel((activePanel + mangaPanels.length - 1) % mangaPanels.length)} aria-label="Previous comic panel">← PREV</button><button type="button" onClick={() => setActivePanel((activePanel + 1) % mangaPanels.length)} aria-label="Next comic panel">NEXT →</button></div></aside></div><div className="manga-scroll-note"><span className="scroll-note-line" /> KEEP SCROLLING <ArrowDown size={14} /></div></section>

      <section className="comic-city-strip scroll-pop" aria-label="Illustrated NYX city"><div className="comic-city-copy"><p className="eyebrow">WELCOME TO THE NEIGHBORHOOD</p><h2>Small town.<br /><em>Big secrets.</em></h2><p>Every corner has a story. Every player has a motive. And every round turns the town into a comic-book mystery.</p><span className="comic-city-stamp">NYX CITY / AFTER DARK ★</span></div><div className="comic-city-art"><img src="/nyxbotwebsite/comic-city.svg" alt="Original cartoon skyline of NYX City under a golden moon" /></div></section>

      <section className="section features-section scroll-pop" id="features"><div className="section-heading"><p className="eyebrow">01 / The family business</p><h2>More than a<br /><em>simple bluff.</em></h2><p className="section-note">A comic-book world of shady characters, secret alliances, dramatic reveals, and hilariously suspicious votes.</p></div><div className="feature-grid">{features.map(([title, description, Icon], index) => <article className="feature-item scroll-pop" key={title}><span className="feature-number">0{index + 1}</span><Icon className="feature-icon" size={22} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="demo-section section scroll-pop" id="demo"><div className="demo-heading"><div><p className="eyebrow">02 / The backroom</p><h2>Step into the <em>backroom</em><br />and test your instincts.</h2></div><span className="demo-label"><span className="live-dot" /> Simulated preview</span></div><div className="game-window"><div className="game-sidebar"><div className="window-brand"><Moon size={15} /> NYX <span>DEMO</span></div><p className="sidebar-label">THE LOBBY</p>{['midnight-coven', 'the-last-light'].map((name, i) => <div className={`lobby ${i === 0 ? 'active' : ''}`} key={name}><span className="lobby-dot" />{name}<small>{i === 0 ? '07' : '—'}</small></div>)}<div className="game-status"><span className="live-dot" /> Server online<br /><small>north america / 01</small></div></div><div className="game-main"><div className="game-topbar"><span><span className="phase-dot" /> {phase.toUpperCase()}</span><span>DAY 02 / 04:17</span></div><div className="game-content"><div className="discussion"><div className="discussion-head"><div><p>midnight-coven</p><span>7 players · private channel</span></div><span className="lock">● encrypted</span></div><div className="chat-messages"><p><b className="name violet">LYRA</b><span>the silence is starting to feel intentional.</span></p><p><b className="name red">VEX</b><span>or maybe everyone is just afraid to be first.</span></p><p><b className="name blue">ORION</b><span>we need a vote before nightfall.</span></p><p className="system-message">The room watches. The clock keeps moving.</p></div><div className="phase-tabs">{(['Discussion', 'Voting', 'Night'] as const).map((item) => <button key={item} className={phase === item ? 'active' : ''} onClick={() => setPhase(item)}>{item}</button>)}</div></div><div className="players-panel"><div className="panel-title">Players <span>07 alive</span></div>{['Lyra', 'Vex', 'Orion', 'Sable', 'Morrow'].map((player, i) => <button key={player} className={`player-row ${selected === player ? 'chosen' : ''}`} onClick={() => setSelected(player)}><span className={`avatar av-${i}`}>{player[0]}</span><span>{player}</span><span className="player-role">{revealed ? ['?','Mafia','?','Doctor','?'][i] : 'hidden'}</span></button>)}<button className="reveal-button" onClick={() => setRevealed(!revealed)}>{revealed ? 'Hide roles' : 'Reveal demo roles'}</button>{selected && <p className="vote-note">{selected} selected for {phase.toLowerCase()}.</p>}</div></div></div></div></section>

      <section className="evidence-section section scroll-pop" id="case-files"><div className="evidence-copy"><p className="eyebrow">CASE FILE / 006</p><h2>Connect the clues.<br /><em>Catch the caper.</em></h2><p>Watch the room, compare stories, and see who cracks under a little cartoon detective pressure.</p><div className="evidence-tags"><span>01 / SUSPECTS</span><span>02 / CLUES</span><span>03 / VOTES</span></div></div><img className="evidence-board" src="/nyxbotwebsite/comic-evidence-board.svg" alt="Illustrated NYX detective desk with a suspect file, clue wall, and vote meter" /></section>

      <section className="section roles-section scroll-pop" id="roles"><div className="section-heading centered"><p className="eyebrow">03 / Meet the suspects</p><h2>Everybody’s got<br /><em>a secret.</em></h2></div><div className="sticker-strip" aria-hidden="true"><img src="/nyxbotwebsite/comic-stickers.svg" alt="" /></div><div className="roles-grid">{roles.map(([title, description, Icon, color]) => <article className={`role-card role-${color} scroll-pop`} key={title}><img className="role-illustration" src={`/nyxbotwebsite/characters/${title.toLowerCase() === 'townsperson' ? 'town' : title.toLowerCase()}.svg`} alt={`${title} cartoon character`} /><div className="role-icon"><Icon size={23} /></div><span className="role-index">ROLE / 0{roles.findIndex((r) => r[0] === title) + 1}</span><h3>{title}</h3><p>{description}</p><div className="role-line" /></article>)}</div></section>

      <section className="commands-section section scroll-pop" id="commands"><div className="commands-copy"><p className="eyebrow">04 / Talk like a boss</p><h2>Keep it cool.<br /><em>Make your move.</em></h2><p>Start a match, tune the rules, and read the room—all without leaving Discord.</p><a className="text-link" href={REPO_URL}>View source on GitHub <ArrowUpRight size={16} /></a></div><div className="commands-list">{commands.map(([command, description], i) => <div className={`command-row ${openCommand === i ? 'expanded' : ''}`} key={command}><button className="command-trigger" onClick={() => setOpenCommand(openCommand === i ? -1 : i)}><code>{command}</code><span>{openCommand === i ? <ChevronDown className="rotate" size={17} /> : <ChevronDown size={17} />}</span></button>{openCommand === i && <div className="command-detail"><span>{description}</span><button aria-label={`Copy ${command}`} onClick={() => copyCommand(command)}>{copied === command ? <Check size={15} /> : <Copy size={15} />}{copied === command ? 'Copied' : 'Copy'}</button></div>}</div>)}</div></section>

      <section className="how-section section scroll-pop" id="how-it-works"><div className="section-heading"><p className="eyebrow">05 / How the caper works</p><h2>Three steps into<br /><em>the family.</em></h2></div><div className="steps-grid">{[['01', 'Invite NYX', 'Add the bot to a Discord server using the official invite link.'], ['02', 'Start a match', 'Use the bot’s supported slash commands to set up a game.'], ['03', 'Play mind games', 'Discover roles, make decisions, discuss suspicions, and vote.']].map(([number, title, desc]) => <div className="step scroll-pop" key={number}><span>{number}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div><a className="button button-primary centered-button" href={INVITE_URL}>Invite NYX <ArrowRight size={18} /></a></section>

      <section className="community-section section scroll-pop" id="community"><div className="community-inner"><div><p className="eyebrow">06 / Join the family</p><h2>A little loyalty.<br />A whole lot of <em>betrayal.</em></h2><p>NYX is a Discord Mafia bot focused on interactive gameplay, strategic decisions, AI opponents, and replayable social deduction.</p></div><div className="community-actions"><a className="button button-primary" href={INVITE_URL}>Invite NYX <ArrowRight size={18} /></a><a className="community-secondary" href={SUPPORT_URL}>Join the community <ArrowRight size={15} /></a><a className="community-secondary" href={REPO_URL}><GitBranch size={15} /> View source code</a></div></div></section>

      <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark"><Moon size={17} /></span><span>NYX</span></a><p>The night has a mind of its own.</p><div><a href={REPO_URL}>GitHub</a><a href={SUPPORT_URL}>Support</a><a href={INVITE_URL}>Invite</a></div><small>© {new Date().getFullYear()} NYX. A Discord community project.</small></footer>
    </main>
  )
}
