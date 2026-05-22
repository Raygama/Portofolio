'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import {
  IconGithub,
  IconLinkedin,
  IconMail,
  IconArrow,
  IconArrowUpRight,
  IconDownload,
} from '@/components/Icons';

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

function AboutHero() {
  return (
    <div className="about-hero">
      <div className="page">
        <div className="terminal-prefix" style={{ marginBottom: 28 }}>
          <span className="pdot" />
          <span>~/about</span>
        </div>
        <h1>About</h1>
        <p className="role">Junior AI Engineer — PT Sigma Cipta Utama</p>
        <div className="about-hero-grid">
          <div>
            <p className="about-hero-lede">
              I&apos;m <strong>M. Daffa Raygama</strong>, an AI Engineer building production LLM systems,
              real-time voice pipelines, and multi-agent architectures. CS graduate from{' '}
              <strong>Telkom University</strong> with a 3.96/4.00 GPA.
            </p>
            <p className="about-hero-lede">
              Currently at <strong>PT Sigma Cipta Utama</strong>, I design and ship AI infrastructure
              that runs in production from RAG pipelines serving users to a real-time
              LLM systems. I care about latency, reliability, and
              making AI systems actually useful.
            </p>
            <p className="about-hero-lede">
              Long term, I&apos;m pursuing a <strong>MEXT research scholarship</strong> to Japan for
              postgrad research in affective computing and multi-modal AI.
            </p>
          </div>
          <div className="about-contact-card">
            <div className="label">Contact &amp; Info</div>
            <div className="info-row">
              <span className="k">Email</span>
              <span className="v">
                <a href="mailto:daffraygama@gmail.com">daffraygama@gmail.com</a>
              </span>
            </div>
            <div className="info-row">
              <span className="k">Location</span>
              <span className="v">South Tangerang, Indonesia</span>
            </div>
            <div className="info-row">
              <span className="k">LinkedIn</span>
              <span className="v">
                <a href="https://linkedin.com/in/mdaffaraygama" target="_blank" rel="noopener noreferrer">
                  daffaraygama
                </a>
              </span>
            </div>
            <div className="info-row">
              <span className="k">GitHub</span>
              <span className="v">
                <a href="https://github.com/raygama" target="_blank" rel="noopener noreferrer">
                  raygama
                </a>
              </span>
            </div>
            <div className="info-row">
              <span className="k">Languages</span>
              <span className="v">Indonesian (native), English (TOEFL 110)</span>
            </div>
            <div style={{ marginTop: 18 }}>
              <a
                href="/cv.pdf"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                download
              >
                <IconDownload className="icon-sm" /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const items = [
    {
      period: 'Jan 2026 — Present',
      title: 'Jr. AI Engineer',
      org: 'PT Sigma Cipta Utama',
      location: 'South Tangerang, Indonesia',
      current: true,
      bullets: [
        'Building production LLM pipelines and agentic workflows for enterprise clients',
        'Designing RAG systems with retrieval optimization and multi-modal document ingestion',
        'Real-time AI infrastructure: AI Monitoring and Alerting System, Multi Agent System',
      ],
    },
    {
      period: '2023 — 2025',
      title: 'Lab Assistant & Researcher — Advanced Software Engineering',
      org: 'Telkom University',
      location: 'Bandung, Indonesia',
      current: false,
      bullets: [
        'Assisted in Advanced Software Engineering coursework: multi-agent systems, real-time data pipelines, project management',
        'Hosted workshops on software architecture, AI system design, and production best practices',
        'Developed and maintained lab infrastructure, logistics, and study groups for 100+ students',
      ],
    },
    {
      period: 'Feb — Jun 2025',
      title: 'Web Developer',
      org: 'Dictum',
      location: 'Bandung, Indonesia',
      current: false,
      muted: true,
      bullets: [
        'Act as a content manager for company website',
        'Collaborate with different departments for events, marketing, and company branding',
      ],
    },
    {
      period: 'Jan — Feb 2025',
      title: 'IT Intern',
      org: 'Jadestone Energy',
      location: 'Jakarta, Indonesia',
      current: false,
      muted: true,
      bullets: [
        'Helped budget tracking of the IT department',
        'Contributed to IT department and office needs such as troubleshooting, new user registration, and maintenance',
      ],
    },
  ];

  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">01</span>
            <h2>Experience</h2>
          </div>
        </div>
        <div className="timeline reveal">
          {items.map((item) => (
            <div
              key={item.title + item.period}
              className={`tl-item${item.current ? ' current' : item.muted ? ' muted' : ''}`}
            >
              <div className="tl-period">{item.period}</div>
              <div className="tl-title">{item.title}</div>
              <div className="tl-org">
                {item.org}
                <span className="sep">·</span>
                {item.location}
              </div>
              <ul>
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">02</span>
            <h2>Education</h2>
          </div>
        </div>
        <div className="edu-card reveal">
          <div>
            <h3>Bachelor of Computer Science</h3>
            <div className="where">Telkom University — Bandung, Indonesia</div>
            <div className="edu-meta">
              <div className="edu-meta-row">
                <span className="k">Period</span>
                <span className="v">2021 — 2025</span>
              </div>
              <div className="edu-meta-row">
                <span className="k">GPA</span>
                <span className="v"><strong>3.96 / 4.00</strong></span>
              </div>
              <div className="edu-meta-row">
                <span className="k">TOEFL iBT</span>
                <span className="v"><strong>110</strong> — C1 equivalent</span>
              </div>
              <div className="edu-meta-row">
                <span className="k">Focus</span>
                <span className="v">Artificial Intelligence, Software Engineering</span>
              </div>
            </div>
          </div>
          <div>
            <div className="edu-thesis">
              <div className="label">Thesis</div>
              <div className="title">
                Technical Debt Management Using Large Language Models and SonarQube Static Analysis
              </div>
              <div className="note">Published — ICGHIT 2026, IEEE Xplore</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    {
      num: '01',
      title: 'AI / LLM',
      chips: ['LangChain', 'LangGraph', 'OpenAI API', 'Ollama', 'DeepSeek', 'Prompt Engineering', 'RAG', 'GGUF'],
    },
    {
      num: '02',
      title: 'Infrastructure',
      chips: ['Docker', 'PostgreSQL', 'Redis', 'RabbitMQ', 'LiveKit', 'Deepgram', 'Nginx'],
    },
    {
      num: '03',
      title: 'Languages',
      chips: ['Python', 'Go', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
    },
    {
      num: '04',
      title: 'Frontend',
      chips: ['Next.js', 'React', 'React Native', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      num: '05',
      title: 'ML / Data',
      chips: ['PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'Hugging Face', 'ONNX'],
    },
    {
      num: '06',
      title: 'Tools & DevOps',
      chips: ['Git', 'GitHub Actions', 'SonarQube', 'Postman', 'Linux', 'Vercel'],
    },
  ];

  return (
    <section className="section">
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">03</span>
            <h2>Skills</h2>
          </div>
        </div>
        <div className="skills-grid reveal">
          {groups.map((g) => (
            <div key={g.num} className="skill-group">
              <div className="head">
                <span className="num">{g.num}</span>
                <h4>{g.title}</h4>
              </div>
              <div className="skill-chips">
                {g.chips.map((c) => (
                  <span key={c} className="skill-chip">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certs = [
    'Microsoft AI-900 — Azure AI Fundamentals',
    'Go Backend Development — Dicoding',
    'Microservices with Go — Dicoding',
  ];

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">04</span>
            <h2>Certifications</h2>
          </div>
        </div>
        <div className="cert-row reveal">
          {certs.map((c) => (
            <div key={c} className="cert-pill">
              <span className="cert-dot" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Goals() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="page">
        <div className="section-head reveal">
          <div className="label">
            <span className="num">05</span>
            <h2>What&apos;s Next</h2>
          </div>
        </div>
        <div className="goals-box reveal">
          <div className="head">// goals &amp; research interests</div>
          <p>
            Pursuing a <strong>MEXT scholarship</strong> for postgrad research in Japan. My research
            interests sit at the intersection of affective computing, multi-modal AI, and human-AI
            interaction — specifically how AI systems can adapt their behavior based on emotional
            and contextual signals in real-time.
          </p>
          <p>
            Long-term: contribute to <strong>open-source AI tooling</strong>, publish research on
            LLM agent systems, and work on global remote teams building AI infrastructure that
            matters at scale.
          </p>
          <span className="annot">building in public, learning in public</span>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="section">
      <div className="page">
        <div className="contact-strip reveal">
          <div>
            <h3>Let&apos;s work together</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Open to AI/LLM roles, research collaborations, and interesting projects.
            </p>
            <div className="open">
              Open to <span className="pill">Full-time</span>{' '}
              <span className="pill">Remote</span>{' '}
              <span className="pill">Research</span>
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
          <div className="footer-mono">built with Next.js · deployed on Vercel</div>
        </footer>
      </div>
    </section>
  );
}

export default function AboutPage() {
  useReveal();
  return (
    <>
      <NavBar />
      <main>
        <AboutHero />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Goals />
        <ContactCTA />
      </main>
    </>
  );
}
