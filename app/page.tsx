'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { Lightbox } from '@/components/Lightbox';
import {
  IconGithub,
  IconLinkedin,
  IconMail,
  IconArrow,
  IconArrowUpRight,
  IconPlay,
  IconYoutube,
} from '@/components/Icons';
import { POSTS } from '@/lib/posts';

/* ─── Typewriter ─── */
const ROLES = [
  'AI Engineer',
  'LLM Agent Builder',
  'Real-Time AI Pipelines',
  'Voice Agents',
];

function TypewriterRoles() {
  const [display, setDisplay] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (typing) {
      if (display.length < target.length) {
        const t = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1600);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [display, roleIdx, typing]);

  return <span>{display}<span className="cursor" /></span>;
}

/* ─── Hero ─── */
function Hero() {
  const winkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const doWink = () => {
      const el = winkRef.current;
      if (!el) return;
      el.style.transition = 'transform 80ms ease';
      el.style.transform = 'scaleY(0.1)';
      setTimeout(() => {
        el.style.transform = 'scaleY(1)';
      }, 160);
    };
    const t = setTimeout(() => {
      doWink();
      const interval = setInterval(doWink, 4200);
      return () => clearInterval(interval);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero">
      <div className="hero-dots" />
      <div className="glow-orb" />
      <div className="glow-orb amber" />
      <div className="page">
        <div className="hero-inner">
          <div className="terminal-prefix" style={{ marginBottom: 28 }}>
            <span className="pdot" />
            <span>~/raygamaa</span>
            <span style={{ color: 'var(--text-tertiary)' }}>$</span>
            <span style={{ color: 'var(--text-tertiary)' }}>./boot</span>
            <span style={{ color: 'var(--accent-amber)' }}>--portfolio</span>
          </div>
          <h1 className="hero-name">
            M. Daffa{' '}
            <span className="glyph">Raygama</span>
            <span ref={winkRef} className="wink"> ✦</span>
          </h1>
          <div className="hero-role-line">
            <span className="arrow">→</span>
            <TypewriterRoles />
          </div>
          <p className="hero-bio">
            Building <strong>production LLM systems</strong> and real-time AI pipelines at{' '}
            <strong>PT Sigma Cipta Utama</strong>. Telkom University CS grad, 3.96 GPA.
            Passionate about open-source AI tooling and multi-agent architectures.
          </p>
          <div className="hero-ctas">
            <Link href="/projects/aura" className="btn btn-primary">
              View AURA Project <span className="arrow">→</span>
            </Link>
            <a href="mailto:daffraygama@gmail.com" className="btn">
              Get in touch
            </a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/raygama" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IconGithub />
            </a>
            <a href="https://linkedin.com/in/daffaraygama" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <IconLinkedin />
            </a>
            <a href="mailto:daffraygama@gmail.com" aria-label="Email">
              <IconMail />
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-annot">
        scroll down <span className="down" />
      </div>
    </section>
  );
}

/* ─── AURA Home Spotlight ─── */
const AURA_FRAMES = [
  { img: '/assets/aura/aura-02-smile.png', emotion: 'Happy' },
  { img: '/assets/aura/aura-03-wink.png', emotion: 'Playful' },
  { img: '/assets/aura/aura-04-surprised.png', emotion: 'Surprised' },
  { img: '/assets/aura/aura-05-companion.png', emotion: 'Companion' },
  { img: '/assets/aura/aura-01-idle.png', emotion: 'Idle' },
];

const WAVE_DELAYS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
const WAVE_HEIGHTS = WAVE_DELAYS.map(() => `${30 + Math.random() * 50}%`);

function AuraHomeSpotlight() {
  const [frameIdx, setFrameIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00');

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setFrameIdx((i) => (i + 1) % AURA_FRAMES.length), 2600);
    return () => clearInterval(t);
  }, [hovered]);

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTimecode(
        [now.getHours(), now.getMinutes(), now.getSeconds()]
          .map((n) => String(n).padStart(2, '0'))
          .join(':')
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">01</span>
            <h2>Featured Project</h2>
            <span className="annot">the one i&apos;m most proud of</span>
          </div>
          <Link href="/projects/aura" className="head-link">
            full case study <IconArrow className="icon-sm" />
          </Link>
        </div>
        <div className="aura-home reveal">
          {/* Visual column */}
          <div
            className="aura-home-visual"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {AURA_FRAMES.map((f, i) => (
              <img
                key={f.img}
                src={f.img}
                alt={`AURA ${f.emotion}`}
                className={`frame-img${i === frameIdx ? ' active' : ''}`}
              />
            ))}
            <div className="aura-home-chrome">
              <div className="aura-home-toprow">
                <div className="live">
                  <span className="dot" />
                  AURA v0.1.1
                </div>
                <div className="emotion-readout">
                  <span className="mono-tag">emotion</span>
                  <span className="emotion-now">{AURA_FRAMES[frameIdx].emotion}</span>
                </div>
              </div>
              <div className="stage-waveform">
                {WAVE_DELAYS.map((d, i) => (
                  <span
                    key={i}
                    className="bar"
                    style={{ animationDelay: `${d}s`, height: WAVE_HEIGHTS[i] }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Body column */}
          <div className="aura-home-body">
            <p className="eyebrow" style={{ marginBottom: 10 }}>Solo Project · 5 months</p>
            <h3 className="aura-home-title">
              AURA — Affective Understanding & Responsive Avatar
            </h3>
            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1.15rem',
              color: 'var(--accent-amber)',
              opacity: 0.85,
              margin: '-6px 0 18px',
              letterSpacing: '0.01em',
            }}>
              A delusion made real.
            </p>
            <p className="aura-home-lede">
              A real-time AI companion with <strong>emotion-aware responses</strong>, Live2D avatar,
              and full WebRTC voice pipeline. Deepgram STT → DeepSeek V3.2 LLM → Qwen TTS → LiveKit.
            </p>
            <div className="aura-home-stack">
              {[
                ['STT', 'Deepgram Nova-3'],
                ['LLM', 'DeepSeek V3.2'],
                ['TTS', 'Qwen 3 (GGUF)'],
                ['Transport', 'LiveKit WebRTC'],
                ['Avatar', 'Live2D Cubism'],
              ].map(([key, val]) => (
                <div key={key} className="stack-row">
                  <span className="key">{key}</span>
                  <span className="val">{val}</span>
                </div>
              ))}
            </div>
            <div className="aura-home-cta">
              <Link href="/projects/aura" className="btn btn-primary">
                Full case study <span className="arrow">→</span>
              </Link>
              <a
                href="https://youtu.be/1fNgofpRVMc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <IconYoutube /> Demo video
              </a>
            </div>
            <div className="aura-home-foot">
              <span className="mono-tag">LLM · WebRTC · Live2D · Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Rizzy Case Study ─── */
const RIZZY_SHOTS = [
  { src: '/assets/rizzy/rizzy-landing.png', cap: 'Landing page' },
  { src: '/assets/rizzy/rizzy-chat.png', cap: 'Chat interface' },
  { src: '/assets/rizzy/rizzy-kb.png', cap: 'Knowledge base' },
  { src: '/assets/rizzy/rizzy-users.png', cap: 'User management' },
  { src: '/assets/rizzy/rizzy-monitoring.png', cap: 'Monitoring' },
];

function RizzyCaseStudy({ openImage }: { openImage: (src: string, cap: string) => void }) {
  return (
    <div className="case-study reveal">
      <div className="case-study-head">
        <div>
          <p className="case-study-meta" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginBottom: 14 }}>
            2025 · Lead Engineer · RAG Platform
          </p>
          <h3>Rizzy Bytes</h3>
          <p>
            A <strong>production RAG platform</strong> serving 1,000+ university students. Built
            with 7 microservices, async message queues, and a multi-modal knowledge base supporting
            25+ KB docs. Led architecture and full-stack development solo.
          </p>
          <div className="stack-chips">
            {['FastAPI', 'LangChain', 'PostgreSQL', 'Redis', 'Docker', 'Next.js', 'RabbitMQ'].map((t) => (
              <span key={t} className="stack-chip">{t}</span>
            ))}
          </div>
          <div className="card-links">
            <a href="https://github.com/Raygama/rizzy-bytes" target="_blank" rel="noopener noreferrer">
              <IconGithub className="icon-sm" /> GitHub
            </a>
          </div>
        </div>
        <div className="case-stats">
          {[
            ['1,000+', 'Active students'],
            ['7', 'Microservices'],
            ['25+ KB', 'Docs indexed'],
            ['100%', 'Async pipeline'],
          ].map(([num, lbl]) => (
            <div key={lbl} className="case-stat">
              <div className="num">{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="case-gallery">
        {RIZZY_SHOTS.map((s, i) => (
          <div
            key={s.src}
            className={`gallery-shot${i === 0 ? ' featured-tile' : ''}`}
            onClick={() => openImage(s.src, s.cap)}
          >
            <img src={s.src} alt={s.cap} />
            <span className="shot-cap">{s.cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sunkatsu Case Study ─── */
const SUNKATSU_SHOTS = [
  { src: '/assets/sunkatsu/sunkatsu-home.png', cap: 'Home' },
  { src: '/assets/sunkatsu/sunkatsu-chat.png', cap: 'AI chat' },
  { src: '/assets/sunkatsu/sunkatsu-orders.png', cap: 'Orders' },
  { src: '/assets/sunkatsu/sunkatsu-mobile-menu.png', cap: 'Mobile menu' },
  { src: '/assets/sunkatsu/sunkatsu-mobile-cart.png', cap: 'Mobile cart' },
];

function SunkatsuCaseStudy({ openImage }: { openImage: (src: string, cap: string) => void }) {
  return (
    <div className="case-study reveal" style={{ marginTop: 24 }}>
      <div className="case-study-head">
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginBottom: 14 }}>
            2025 · PM + Full-stack · Restaurant Platform
          </p>
          <h3>Sunkatsu App</h3>
          <p>
            Digital ordering platform for <strong>Sunkatsu</strong>, a Japanese restaurant in Telkom University&apos;s campus cafeteria.
            Spans web, mobile, and a <strong>Qwen-2.5 AI chatbot</strong>. Led a team of 6 as PM and handled frontend architecture
            delivered with 11 language localizations and full ordering flow across all platforms.
          </p>
          <div className="stack-chips">
            {['Next.js', 'React Native', 'FastAPI', 'PostgreSQL', 'Qwen-2.5', 'Docker'].map((t) => (
              <span key={t} className="stack-chip">{t}</span>
            ))}
          </div>
          <div className="card-links">
            <a href="https://github.com/abiyyu1564/sunkatsuapp" target="_blank" rel="noopener noreferrer">
              <IconGithub className="icon-sm" /> GitHub
            </a>
          </div>
        </div>
        <div className="case-stats">
          {[
            ['3', 'Platforms'],
            ['6', 'Team members'],
            ['11', 'Languages'],
            ['PM', 'Role led'],
          ].map(([num, lbl]) => (
            <div key={lbl} className="case-stat">
              <div className="num">{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="case-gallery">
        {SUNKATSU_SHOTS.map((s, i) => (
          <div
            key={s.src}
            className={`gallery-shot${i === 0 ? ' featured-tile' : ''}`}
            onClick={() => openImage(s.src, s.cap)}
          >
            <img src={s.src} alt={s.cap} />
            <span className="shot-cap">{s.cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Supabase Eval Case Study ─── */
const SUPABASE_EVAL_SHOTS = [
  { src: '/assets/supabase-eval/dashboard.png', cap: 'Evaluation Telemetry Dashboard' },
  { src: '/assets/supabase-eval/metrics.png', cap: 'Detailed evaluation categories & metrics' },
];

function SupabaseEvalCaseStudy({ openImage }: { openImage: (src: string, cap: string) => void }) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % SUPABASE_EVAL_SHOTS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="case-study reveal" style={{ marginTop: 24 }}>
      <div className="case-study-head">
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-tertiary)', letterSpacing: '0.04em', marginBottom: 14 }}>
            2026 · AI Engineer · Database Agent & Eval Framework
          </p>
          <h3>Supabase Eval</h3>
          <p>
            An AI database assistant agent answering natural language queries over a Supabase database via an HTTP MCP server, grounded in a <strong>pgvector knowledge base</strong>. Measured by an automated <strong>LLM-as-judge eval pipeline</strong> scoring accuracy and security across 30 test scenarios.
          </p>
          <div className="stack-chips">
            {['Supabase', 'Next.js', 'pgvector', 'Deno', 'Claude Sonnet', 'OpenAI Embeddings'].map((t) => (
              <span key={t} className="stack-chip">{t}</span>
            ))}
          </div>
          <div className="card-links" style={{ display: 'flex', gap: 16 }}>
            <Link href="/projects/supabase-eval" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Case Study <IconArrow className="icon-sm" />
            </Link>
            <a href="https://supabase-eval.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Live Dashboard <IconArrowUpRight className="icon-sm" />
            </a>
            <a href="https://github.com/Raygama/supabase-eval" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IconGithub className="icon-sm" /> GitHub
            </a>
          </div>
        </div>
        <div className="case-stats">
          {[
            ['100%', 'Pass Rate'],
            ['4.93/5', 'Avg Score'],
            ['30', 'Test Cases'],
            ['8.9s', 'Avg Latency'],
          ].map(([num, lbl]) => (
            <div key={lbl} className="case-stat">
              <div className="num" style={{ color: lbl.includes('Score') ? 'var(--accent-amber)' : lbl.includes('Rate') ? 'var(--accent-green)' : 'var(--accent-teal)' }}>{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Auto-sliding Case Gallery */}
      <div 
        className="case-gallery" 
        style={{ 
          gridTemplateColumns: '1fr', 
          gridTemplateRows: '100%', 
          position: 'relative',
          aspectRatio: '16/9.5',
          overflow: 'hidden'
        }}
      >
        {SUPABASE_EVAL_SHOTS.map((s, i) => (
          <div
            key={s.src}
            className="gallery-shot"
            onClick={() => openImage(s.src, s.cap)}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === slideIdx ? 1 : 0,
              pointerEvents: i === slideIdx ? 'auto' : 'none',
              transition: 'opacity 800ms ease-in-out',
            }}
          >
            <img 
              src={s.src} 
              alt={s.cap} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                padding: '0',
                display: 'block',
              }} 
            />
            <span className="shot-cap">{s.cap} (Auto-sliding · Click to zoom)</span>
          </div>
        ))}

        {/* Carousel indicators */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 16,
          display: 'flex',
          gap: 6,
          zIndex: 10,
          background: 'rgba(10, 10, 15, 0.6)',
          padding: '6px 10px',
          borderRadius: '999px',
          backdropFilter: 'blur(4px)',
          border: '1px solid var(--border-subtle)',
        }}>
          {SUPABASE_EVAL_SHOTS.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setSlideIdx(i);
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === slideIdx ? 'var(--accent-teal)' : 'var(--text-tertiary)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 250ms ease',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Other Projects ─── */
interface OtherProject {
  num: string;
  title: string;
  tags: string[];
  year: string;
  links: { label: string; href: string }[];
}

function OtherProjects() {
  const projects: OtherProject[] = [
    {
      num: '01',
      title: 'TD Management with LLM + SonarQube',
      tags: ['Python', 'LLM', 'SonarQube', 'Technical Debt'],
      year: '2025',
      links: [{ label: 'Zenodo', href: 'https://zenodo.org/records/18033027' }],
    },
    {
      num: '02',
      title: 'Military Land Mines Classifier — KNN',
      tags: ['Python', 'scikit-learn', 'KNN', 'Signal Processing'],
      year: '2024',
      links: [
        { label: 'Notebook', href: 'https://colab.research.google.com/drive/11RqgTYM-RVkQPu21eyALhkxnGHhM0Ctj?usp=sharing' }
      ],
    },
    {
      num: '03',
      title: 'Malaria Cell Classification — CNN',
      tags: ['Python', 'TensorFlow', 'CNN', 'Medical AI'],
      year: '2024',
      links: [{ label: 'Notebook', href: 'https://colab.research.google.com/drive/1uwur2Ki8ob9Y8IRQSmBfRoUXcGOqgYKY?usp=sharing' }],
    },
    {
      num: '04',
      title: 'Deposit Customer Predictions — KNN',
      tags: ['Python', 'scikit-learn', 'KNN', 'Tabular Data'],
      year: '2024',
      links: [{ label: 'Details', href: 'https://drive.google.com/file/d/1-O1mrBcMhC_LUtWhOXZO5HBHVY8JzP89/view' }],
    },
    {
      num: '05',
      title: 'HF Extractor — MSR Research Tool',
      tags: ['Python', 'Flask', 'Hugging Face', 'Web Scraping'],
      year: '2025',
      links: [{ label: 'GitHub', href: 'https://github.com/F201/hf-extractor' }],
    },
    {
      num: '06',
      title: 'Microservices Study — Go',
      tags: ['Go', 'gRPC', 'Docker', 'Microservices'],
      year: '2025',
      links: [{ label: 'GitHub', href: 'https://github.com/Raygama/GoMicroServ-Study' }],
    },
  ];

  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">03</span>
            <h2>Other Projects</h2>
          </div>
        </div>
        <div className="other-list reveal">
          {projects.map((p) => (
            <div key={p.num} className="other-row" style={{ cursor: 'default' }}>
              <span className="row-num">{p.num}</span>
              <div>
                <h4>{p.title}</h4>
                <div className="tags-line">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <span className="year">{p.year}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--accent-teal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: '1px solid rgba(45,212,191,0.25)',
                      transition: 'all 180ms ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(45,212,191,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    }}
                  >
                    {l.label} <IconArrowUpRight className="icon-sm" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Snapshot ─── */
function AboutSnapshot() {
  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">04</span>
            <h2>About Me</h2>
          </div>
          <Link href="/about" className="head-link">
            full bio <IconArrow className="icon-sm" />
          </Link>
        </div>
        <div className="about-grid reveal">
          <div className="about-text">
            <p>
              I&apos;m a <strong>Junior AI Engineer</strong> at PT Sigma Cipta Utama, currently building
              production LLM systems and real-time AI infrastructure. CS graduate from Telkom University
              with a 3.96/4.00 GPA.
            </p>
            <p>
              My work spans <strong>LLM agent pipelines</strong>, real-time audio/video AI (WebRTC),
              RAG systems, and microservices. I care deeply about making AI systems that actually work
              in production — low latency, high reliability.
            </p>
            <p>
              I&apos;m pursuing a <strong>MEXT research scholarship</strong> to continue AI research
              in Japan, focused on affective computing and multi-modal AI systems.
            </p>
            <Link href="/about" className="read-more">
              Read full bio <IconArrow className="icon-sm" />
            </Link>
          </div>
          <div className="stat-grid">
            {[
              ['3.96', 'GPA / 4.00'],
              ['3+', 'Production projects'],
              ['5mo', 'AURA dev time'],
              ['TOEFL', 'iBT 110'],
            ].map(([big, sub]) => (
              <div key={sub} className="stat-card">
                <div className="big">{big}</div>
                <div className="sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Blog Strip ─── */
function BlogStrip() {
  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">05</span>
            <h2>Writing</h2>
          </div>
          <Link href="/blog" className="head-link">
            all posts <IconArrow className="icon-sm" />
          </Link>
        </div>
        <div className="blog-grid reveal">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-card">
                <div className="blog-meta">
                  <span>{new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  <span className="dotsep">·</span>
                  <span>{p.readingTime}</span>
                </div>
                <h3>{p.title}</h3>
                <div className="blog-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact CTA ─── */
function ContactCTA() {
  return (
    <section className="section">
      <div className="page">
        <div className="contact-strip reveal">
          <div>
            <h3>Let&apos;s build something together</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Open to interesting AI/LLM projects, research collaborations, and full-time roles.
            </p>
            <div className="open">
              Open to <span className="pill">Full-time</span> <span className="pill">Remote</span> <span className="pill">Research</span>
            </div>
            <span className="contact-loc">South Tangerang, Indonesia</span>
          </div>
          <div className="contact-actions">
            <a href="mailto:daffraygama@gmail.com">
              <span><IconMail className="icon-sm" /> daffraygama@gmail.com</span>
              <span className="arrow">→</span>
            </a>
            <a href="https://linkedin.com/in/daffaraygama" target="_blank" rel="noopener noreferrer">
              <span><IconLinkedin className="icon-sm" /> LinkedIn</span>
              <span className="arrow">→</span>
            </a>
            <a href="https://github.com/raygama" target="_blank" rel="noopener noreferrer">
              <span><IconGithub className="icon-sm" /> GitHub</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-mono">
            © 2025 M. Daffa Raygama <span className="blink">_</span>
          </div>
          <div className="footer-mono">built with love and passion</div>
        </footer>
      </div>
    </section>
  );
}

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Page ─── */
export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxCap, setLightboxCap] = useState('');

  const openImage = useCallback((src: string, cap: string) => {
    setLightboxSrc(src);
    setLightboxCap(cap);
  }, []);

  useReveal();

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <AuraHomeSpotlight />
        <section className="section">
          <div className="page">
            <div className="section-head reveal">
              <div className="label">
                <span className="num">02</span>
                <h2>Case Studies</h2>
              </div>
            </div>
            <RizzyCaseStudy openImage={openImage} />
            <SunkatsuCaseStudy openImage={openImage} />
            <SupabaseEvalCaseStudy openImage={openImage} />
          </div>
        </section>
        <OtherProjects />
        <AboutSnapshot />
        <BlogStrip />
        <ContactCTA />
      </main>
      <Lightbox
        src={lightboxSrc}
        caption={lightboxCap}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
}
