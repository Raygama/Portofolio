'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { Lightbox } from '@/components/Lightbox';
import {
  IconGithub,
  IconArrowLeft,
  IconMail,
  IconArrowUpRight,
} from '@/components/Icons';

function IconPlay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'icon'}>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Data ─── */
const FRAMES = [
  {
    src: '/assets/aura/aura-02-smile.png',
    emotion: 'happy',
    label: 'Happy',
    tc: '02:18',
    note: 'detected from positive sentiment + exclamation tokens',
  },
  {
    src: '/assets/aura/aura-03-wink.png',
    emotion: 'playful',
    label: 'Playful',
    tc: '02:29',
    note: 'triggered on jokes, banter, tildes (~), playful punctuation',
  },
  {
    src: '/assets/aura/aura-04-surprised.png',
    emotion: 'surprised',
    label: 'Surprised',
    tc: '02:33',
    note: 'question marks, unexpected facts, contradictions',
  },
  {
    src: '/assets/aura/aura-05-companion.png',
    emotion: 'companion',
    label: 'Companion',
    tc: '02:37',
    note: 'comforting + summoning the ghost helper for emphasis',
  },
  {
    src: '/assets/aura/aura-01-idle.png',
    emotion: 'idle',
    label: 'Idle',
    tc: '00:00',
    note: 'mic open, waiting for input',
  },
];

/* ─── Section Header ─── */
function SectionHeader({
  num,
  title,
  annot,
}: {
  num: string;
  title: string;
  annot?: string;
}) {
  return (
    <div className="section-head reveal">
      <div className="label">
        <span className="num">§ {num}</span>
        <h2>{title}</h2>
        {annot && <span className="annot">{annot}</span>}
      </div>
    </div>
  );
}

/* ─── Emotion Stage ─── */
function EmotionStage() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % FRAMES.length), 2800);
    return () => clearInterval(t);
  }, [auto]);

  const current = FRAMES[idx];

  return (
    <div className="spotlight" style={{ alignItems: 'stretch' }}>
      {/* Stage */}
      <div
        className="aura-stage"
        onMouseEnter={() => setAuto(false)}
        onMouseLeave={() => setAuto(true)}
      >
        {FRAMES.map((f, i) => (
          <img
            key={f.emotion}
            src={f.src}
            alt={`AURA — ${f.label}`}
            className={`frame-img${i === idx ? ' active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="stage-chrome">
          <div className="stage-bar">
            <span className="live">
              <span className="dot" />
              AURA · LIVE
            </span>
            <span className="timecode">{current.tc}</span>
          </div>
          <div className="stage-bottom">
            <div className="emotion-pills">
              {FRAMES.map((f, i) => (
                <button
                  key={f.emotion}
                  className={`emotion-pill${i === idx ? ' active' : ''}`}
                  onClick={() => { setIdx(i); setAuto(false); }}
                  aria-label={`Switch to ${f.label}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="stage-waveform" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="bar" style={{ animationDelay: `${i * 90}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="spot-info">
        <div className="eyebrow" style={{ marginBottom: 16 }}>● live emotion preview</div>
        <h3>Five distinct emotion states drive a Live2D rig in real time.</h3>
        <p className="lede">
          Every LLM reply gets classified into one of five <strong>emotion states</strong>: happy, playful,
          surprised, companion, or idle. The avatar&apos;s Live2D parameters (eyes, mouth, head tilt) blend
          toward that state while the TTS audio plays. Companion mode also summons the ghost helper.
        </p>

        <div className="pipeline" style={{ marginBottom: 24 }}>
          <div className="pipe-label">currently displaying</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--accent-amber)',
                letterSpacing: '-0.02em',
              }}
            >
              {current.label}
            </span>
            <span className="mono-tag">@ {current.tc}</span>
          </div>
          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            {current.note}
          </p>
        </div>

        <div className="hero-ctas" style={{ marginBottom: 0 }}>
          <a
            href="https://github.com/F201/Project_AURA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <IconGithub className="icon-sm" /> Source
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Pipeline Section ─── */
function PipelineSection() {
  return (
    <section className="section" id="pipeline" style={{ paddingTop: 60 }}>
      <div className="page">
        <SectionHeader
          num="01"
          title="The Pipeline"
          annot="four hops, under 800ms"
        />
        <div className="reveal" style={{ maxWidth: 920, margin: '0 auto' }}>
          <div className="pipeline">
            <div className="pipe-label">end-to-end runtime · single utterance</div>
            <div className="pipeline-row">
              <div className="pipe-node teal">
                <span className="stage">01 · STT</span>
                <span className="tool">Deepgram</span>
              </div>
              <div className="pipe-node amber">
                <span className="stage">02 · LLM</span>
                <span className="tool">DeepSeek V3.2</span>
              </div>
              <div className="pipe-node purple">
                <span className="stage">03 · TTS</span>
                <span className="tool">Qwen 3 TTS</span>
              </div>
              <div className="pipe-node rose">
                <span className="stage">04 · Avatar</span>
                <span className="tool">Live2D + LiveKit</span>
              </div>
            </div>
          </div>

          <div className="stack-table" style={{ marginTop: 36 }}>
            <div className="stack-key">Transport</div>
            <div className="stack-val">LiveKit (WebRTC)</div>
            <div className="stack-note">sub-300ms RTT</div>

            <div className="stack-key">Speech-to-Text</div>
            <div className="stack-val">Deepgram</div>
            <div className="stack-note">multilingual stream</div>

            <div className="stack-key">Reasoning</div>
            <div className="stack-val">DeepSeek V3.2</div>
            <div className="stack-note">via OpenRouter</div>

            <div className="stack-key">Text-to-Speech</div>
            <div className="stack-val">Qwen 3 TTS</div>
            <div className="stack-note">expressive, low-latency</div>

            <div className="stack-key">Avatar</div>
            <div className="stack-val">Live2D Cubism</div>
            <div className="stack-note">emotion-driven rig</div>

            <div className="stack-key">Backend</div>
            <div className="stack-val">Python · FastAPI</div>
            <div className="stack-note">single-binary deploy</div>

            <div className="stack-key">Emotion classifier</div>
            <div className="stack-val">prompt-based · per-turn</div>
            <div className="stack-note">5 discrete states</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Demo Video Section ─── */
function DemoVideoSection() {
  return (
    <section className="section" id="demo" style={{ paddingTop: 40 }}>
      <div className="page">
        <SectionHeader
          num="02"
          title="Demo"
          annot="v0.1.1 · live voice loop"
        />
        <div className="reveal demo-video-wrap">
          <div className="demo-video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/1fNgofpRVMc?rel=0&modestbranding=1&color=white"
              title="Project AURA v0.1.1 Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="demo-video-meta">
            <span className="mono-tag" style={{ color: 'var(--accent-teal)' }}>v0.1.1 demo</span>
            <span className="mono-tag" style={{ marginLeft: 'auto' }}>
              <a
                href="https://youtu.be/1fNgofpRVMc"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-amber)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                open on YouTube <IconArrowUpRight className="icon-sm" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Emotion Gallery ─── */
function EmotionGallery({ openImage }: { openImage: (src: string, cap: string) => void }) {
  const frames = [
    { src: '/assets/aura/aura-01-idle.png', label: 'Idle', desc: 'Default rest pose. Mic open, no inference.' },
    { src: '/assets/aura/aura-02-smile.png', label: 'Happy', desc: 'Positive sentiment, gentle smile, eye crinkle.' },
    { src: '/assets/aura/aura-03-wink.png', label: 'Playful', desc: 'Single-eye wink, slight head tilt. Triggered on banter.' },
    { src: '/assets/aura/aura-04-surprised.png', label: 'Surprised', desc: 'Mouth open, eyes wider. Triggered on unexpected input.' },
    { src: '/assets/aura/aura-05-companion.png', label: 'Companion', desc: 'Ghost helper materializes alongside the avatar.' },
  ];

  return (
    <section className="section" id="emotions" style={{ paddingTop: 40 }}>
      <div className="page">
        <SectionHeader
          num="03"
          title="The Emotion System"
          annot="five poses, blended over Live2D parameters"
        />
        <div className="emotion-grid reveal">
          {frames.map((f, i) => (
            <button
              key={f.label}
              className="emotion-card"
              onClick={() => openImage(f.src, `AURA · ${f.label}`)}
              aria-label={`View ${f.label} state`}
            >
              <div className="emotion-card-img">
                <img src={f.src} alt={f.label} loading="lazy" />
              </div>
              <div className="emotion-card-body">
                <div className="emotion-card-label">
                  <span className="mono-tag">0{i + 1}</span>
                  <span className="emotion-card-name">{f.label}</span>
                </div>
                <p>{f.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Avatar Rendering Section ─── */
function AvatarRenderingSection() {
  const layers = [
    { label: 'Transport', name: 'LiveKit + Web Audio', detail: 'WebRTC data channel + AnalyserNode', color: 'rose' },
    { label: 'Model Runtime', name: 'Cubism 4 Core', detail: 'WASM · parametric model engine', color: 'purple' },
    { label: 'Live2D Bridge', name: 'pixi-live2d-display', detail: 'v0.4 · Cubism 4 subpackage', color: 'amber' },
    { label: 'Browser Layer', name: 'PIXI Application', detail: 'WebGL canvas · full-viewport', color: 'teal' },
  ];

  const features = [
    {
      tag: '01 · blink fsm',
      title: 'Organic Blink',
      desc: 'A finite state machine fires random timers for the blinks. Probability and cooldown both vary, so the pattern never repeats exactly.',
      param: 'ParamEyeLOpen / ParamEyeROpen',
      color: 'teal',
    },
    {
      tag: '02 · saccades',
      title: 'Eye Saccades',
      desc: 'Every frame adds a little randomization to gaze direction via Math.random(), so the eyes drift the way real eyes do and never sit perfectly still.',
      param: 'ParamEyeBallX / ParamEyeBallY',
      color: 'amber',
    },
    {
      tag: '03 · lip sync',
      title: 'RMS Lip Sync',
      desc: 'AnalyserNode computes Root Mean Square amplitude from the LiveKit audio track in a requestAnimationFrame loop and maps it directly to mouth open.',
      param: 'ParamMouthOpenY',
      color: 'purple',
    },
  ];

  return (
    <section className="section" id="avatar" style={{ paddingTop: 40 }}>
      <div className="page">
        <SectionHeader
          num="04"
          title="Avatar Rendering"
          annot="browser-native, zero external software"
        />
        <div className="render-grid reveal">
          <div>
            <div className="render-layer-label">rendering stack · bottom → top</div>
            <div className="render-layers">
              {layers.map((l) => (
                <div key={l.name} className={`render-layer ${l.color}`}>
                  <div className="rl-meta">
                    <span className="rl-tag">{l.label}</span>
                    <span className="rl-name">{l.name}</span>
                  </div>
                  <span className="rl-detail">{l.detail}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginTop: 20, marginBottom: 0 }}>
              The avatar runs <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>entirely in the browser</strong>, with no VTube Studio
              and no external process. The animation loop is monkey-patched into{' '}
              <span className="mono-tag">coreModel.update()</span> so every frame
              gets injected parameters right before GPU commit.
            </p>
          </div>

          <div className="render-feature-cards">
            {features.map((f) => (
              <div key={f.tag} className={`render-feature ${f.color}`}>
                <div className="rf-header">
                  <span className="rf-tag">{f.tag}</span>
                  <h4 className="rf-title">{f.title}</h4>
                </div>
                <p className="rf-desc">{f.desc}</p>
                <div className="rf-param">
                  <span className="mono-tag">→ {f.param}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── AI Memory Section ─── */
function AIMemorySection() {
  const ingestSteps = [
    { num: '01', label: 'Upload', detail: 'POST /api/v1/memory · PDF, TXT, MD', color: 'teal' },
    { num: '02', label: 'Chunking', detail: '500-char overlapping chunks via PDF parser', color: 'amber' },
    { num: '03', label: 'Embedding', detail: 'Sentence-Transformers → dense vector', color: 'purple' },
    { num: '04', label: 'Storage', detail: 'Supabase pgvector · vector + metadata', color: 'rose' },
  ];

  const retrievalSteps = [
    { num: '01', label: 'User speaks', detail: 'Deepgram transcription → query text', color: 'teal' },
    { num: '02', label: 'Semantic search', detail: 'Vector similarity vs. memories table', color: 'amber' },
    { num: '03', label: 'Top chunks', detail: 'Best-match text retrieved from pgvector', color: 'purple' },
    { num: '04', label: 'Context inject', detail: 'Chunks injected into LLM system prompt', color: 'rose' },
  ];

  const tables = [
    { name: 'conversations', desc: 'Metadata — id, title, user_id', accent: 'teal' },
    { name: 'messages', desc: 'Chat history — content, role, emotion, timestamp', accent: 'amber' },
    { name: 'memories', desc: 'Knowledge base — content, embedding vector, metadata', accent: 'purple' },
    { name: 'personality_settings', desc: 'System prompts, voice, emotional baselines', accent: 'rose' },
  ];

  return (
    <section className="section" id="memory" style={{ paddingTop: 40 }}>
      <div className="page">
        <SectionHeader
          num="05"
          title="AI Memory & RAG"
          annot="reads documents, recalls on demand"
        />
        <div className="memory-grid reveal">
          <div className="memory-card">
            <div className="memory-card-head">
              <span className="mono-tag" style={{ color: 'var(--accent-teal)' }}>ingestion pipeline</span>
              <h4>Teaching AURA</h4>
              <p>
                Upload any document. AURA chunks and embeds it, and the contents are searchable
                in the middle of a live conversation.
              </p>
            </div>
            <div className="memory-flow">
              {ingestSteps.map((s, i) => (
                <div key={s.num} className="mflow-item">
                  <div className={`mflow-node ${s.color}`}>
                    <span className="mflow-num">{s.num}</span>
                    <div className="mflow-content">
                      <span className="mflow-label">{s.label}</span>
                      <span className="mflow-detail">{s.detail}</span>
                    </div>
                  </div>
                  {i < ingestSteps.length - 1 && <div className="mflow-connector" />}
                </div>
              ))}
            </div>
          </div>

          <div className="memory-card">
            <div className="memory-card-head">
              <span className="mono-tag" style={{ color: 'var(--accent-amber)' }}>retrieval · per turn</span>
              <h4>AURA Remembers</h4>
              <p>
                Every utterance triggers a semantic search. Matching chunks get injected into the
                LLM context with no visible step, so AURA just seems to know.
              </p>
            </div>
            <div className="memory-flow">
              {retrievalSteps.map((s, i) => (
                <div key={s.num} className="mflow-item">
                  <div className={`mflow-node ${s.color}`}>
                    <span className="mflow-num">{s.num}</span>
                    <div className="mflow-content">
                      <span className="mflow-label">{s.label}</span>
                      <span className="mflow-detail">{s.detail}</span>
                    </div>
                  </div>
                  {i < retrievalSteps.length - 1 && <div className="mflow-connector" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="db-schema reveal" style={{ marginTop: 20 }}>
          <div className="pipe-label">supabase schema · 4 tables</div>
          <div className="db-table-grid">
            {tables.map((t) => (
              <div key={t.name} className={`db-table-card ${t.accent}`}>
                <span className="db-table-name">{t.name}</span>
                <span className="db-table-desc">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Interface Section ─── */
function InterfaceSection({ openImage }: { openImage: (src: string, cap: string) => void }) {
  return (
    <section className="section" id="interface" style={{ paddingTop: 40 }}>
      <div className="page">
        <SectionHeader
          num="06"
          title="The Interface"
          annot="the avatar plus the whole control surface"
        />
        <div className="interface-grid reveal">
          <button
            className="interface-shot"
            onClick={() => openImage('/assets/aura/aura-chat.png', 'AURA · Chat Interface')}
            aria-label="View chat interface"
          >
            <img src="/assets/aura/aura-chat.png" alt="AURA chat interface" loading="lazy" />
            <div className="interface-cap">
              <div className="cap-label"><span className="mono-tag">01</span> Chat surface</div>
              <p>
                Side-by-side conversation log with per-message emotion tags. Conversations are organized into{' '}
                <strong>contexts</strong>, and each one keeps its own memory and personality settings.
              </p>
            </div>
          </button>
          <button
            className="interface-shot"
            onClick={() => openImage('/assets/aura/aura-control-center.png', 'AURA · System Control Center')}
            aria-label="View control center"
          >
            <img src="/assets/aura/aura-control-center.png" alt="AURA system control center" loading="lazy" />
            <div className="interface-cap">
              <div className="cap-label"><span className="mono-tag">02</span> System Control Center</div>
              <p>
                Hot-swap the LLM provider, model architecture, personality sliders, and API keys at runtime.
                Nothing restarts. The whole brain is <strong>reconfigurable from the browser</strong>.
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Highlights ─── */
function HighlightsSection() {
  return (
    <section className="section" id="highlights" style={{ paddingTop: 40 }}>
      <div className="page">
        <SectionHeader num="07" title="What I built · what's next" />
        <div className="hl-grid reveal">
          <div>
            <h4 className="hl-title">What&apos;s in v0.1.1</h4>
            <ul className="spot-highlights">
              {[
                ['End-to-end voice loop', 'under 800ms from speech end to TTS start.'],
                ['Multilingual', 'in and out. Deepgram and Qwen 3 handle EN/ID switching mid-sentence.'],
                ['Five-state emotion system', 'with prompt-based classification per turn.'],
                ['Live2D rig', 'driven by emotion vectors, lip-sync from TTS phonemes.'],
                ['Hot-reload model swap', 'to change LLM provider or model live from the control center.'],
                ['Per-context memory', 'so every chat keeps its own personality, history, and creativity dial.'],
              ].map(([bold, rest]) => (
                <li key={bold}>
                  <span className="marker">✦</span>
                  <span><strong>{bold}</strong> {rest}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="hl-title">What&apos;s next</h4>
            <ul className="spot-highlights">
              {[
                ['Tool use', 'via function-calling for calendar, search, and code execution.'],
                ['Long-term memory', 'with vector recall across contexts.'],
                ['Vision input', 'from webcam frames, so AURA can see what you\'re working on.'],
                ['Avatar marketplace', 'with pluggable Live2D rigs and rig-aware emotion mapping.'],
                ['Mobile client', 'for the conversation loop.'],
                ['v1.0', 'when emotion classification moves on-device.'],
              ].map(([bold, rest]) => (
                <li key={bold}>
                  <span className="marker" style={{ color: 'var(--accent-amber)' }}>→</span>
                  <span><strong>{bold}</strong> {rest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Bottom CTA ─── */
function BottomCTA() {
  return (
    <section className="section" id="bottom" style={{ paddingTop: 40 }}>
      <div className="page">
        <div className="contact-strip reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>§ 08 · talk to me about AURA</div>
            <h3>Building real-time AI? Let&apos;s compare notes.</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
              I&apos;m always up for swapping notes on Live2D rigging, sub-second voice pipelines, or
              emotion classification prompts. And if you want AURA&apos;s roadmap to head somewhere
              specific, tell me.
            </p>
            <div className="contact-loc">
              currently in South Tangerang, Indonesia, async-friendly across timezones
            </div>
          </div>
          <div className="contact-actions">
            <a href="https://youtu.be/1fNgofpRVMc" target="_blank" rel="noopener noreferrer">
              <span><IconPlay className="icon-sm" /> &nbsp; Demo v0.1.1 on YouTube</span>
              <IconArrowUpRight className="icon-sm" />
            </a>
            <a href="https://github.com/F201/Project_AURA" target="_blank" rel="noopener noreferrer">
              <span><IconGithub className="icon-sm" /> &nbsp; Source on GitHub</span>
              <IconArrowUpRight className="icon-sm" />
            </a>
            <a href="mailto:daffraygama@gmail.com">
              <span><IconMail className="icon-sm" /> &nbsp; Email me</span>
              <IconArrowUpRight className="icon-sm" />
            </a>
          </div>
        </div>

        <footer className="footer">
          <Link
            href="/"
            className="footer-mono"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}
          >
            <IconArrowLeft className="icon-sm" /> back to all projects
          </Link>
          <div className="footer-mono">© 2026 · M. Daffa Raygama <span className="blink">_</span></div>
        </footer>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function AuraPage() {
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
        {/* Page Header */}
        <section className="page-header">
          <div className="glow-orb" />
          <div className="glow-orb amber" />
          <div className="page" style={{ position: 'relative', zIndex: 2 }}>
            <Link href="/" className="back-link">
              <IconArrowLeft className="icon-sm" /> all projects
            </Link>
            <div className="header-tags">
              {['LLM', 'WebRTC', 'Live2D', 'Real-time', 'Solo · 5 months'].map((t, i) => (
                <span
                  key={t}
                  className={`tag-pill ${['amber', 'teal', 'purple', 'rose', ''][i]}`}
                >
                  {t}
                </span>
              ))}
            </div>
            <h1>Project AURA</h1>
            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1.3rem',
              color: 'var(--accent-amber)',
              opacity: 0.88,
              margin: '-8px 0 20px',
              letterSpacing: '0.01em',
            }}>
              A delusion made real.
            </p>
            <p className="subtitle">
              A real-time AI companion with a sub-second voice loop, an emotion-aware Live2D rig,
              and a control center that hot-swaps the entire AI brain at runtime.
            </p>
            <div className="terminal-prefix" style={{ marginBottom: 32 }}>
              <span className="pdot" />
              ~/raygamaa/aura ${' '}
              <span style={{ color: 'var(--text-secondary)', marginLeft: 6 }}>
                ./aura --stream --multilingual
              </span>
            </div>

            <EmotionStage />
          </div>
        </section>

        <PipelineSection />
        <DemoVideoSection />
        <EmotionGallery openImage={openImage} />
        <AvatarRenderingSection />
        <AIMemorySection />
        <InterfaceSection openImage={openImage} />
        <HighlightsSection />
        <BottomCTA />
      </main>
      <Lightbox
        src={lightboxSrc}
        caption={lightboxCap}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
}
