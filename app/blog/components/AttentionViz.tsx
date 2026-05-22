'use client';

import { useState } from 'react';

/* Predefined attention weights for "The cat sat on the mat because it was sleepy" */
const WORDS = ['The', 'cat', 'sat', 'on', 'the', 'mat', 'because', 'it', 'was', 'sleepy'];

/*
  Attention weights [query_idx][key_idx].
  Row = which word is asking ("query")
  Col = which word is being looked at ("key")
  These are illustrative / hand-crafted to show meaningful patterns.
*/
const WEIGHTS: number[][] = [
  // The   cat   sat   on    the   mat   because  it    was  sleepy
  [0.40, 0.20, 0.10, 0.05, 0.08, 0.07,  0.03,  0.03, 0.02, 0.02], // The
  [0.12, 0.45, 0.18, 0.04, 0.04, 0.05,  0.04,  0.04, 0.02, 0.02], // cat
  [0.06, 0.30, 0.35, 0.08, 0.05, 0.06,  0.04,  0.03, 0.02, 0.01], // sat
  [0.04, 0.08, 0.12, 0.30, 0.14, 0.18,  0.05,  0.04, 0.03, 0.02], // on
  [0.20, 0.08, 0.06, 0.06, 0.30, 0.18,  0.04,  0.03, 0.02, 0.03], // the
  [0.06, 0.10, 0.08, 0.08, 0.12, 0.42,  0.04,  0.04, 0.03, 0.03], // mat
  [0.04, 0.06, 0.06, 0.04, 0.04, 0.06,  0.38,  0.16, 0.08, 0.08], // because
  [0.03, 0.42, 0.06, 0.04, 0.04, 0.08,  0.12,  0.10, 0.06, 0.05], // it  <-- attends to "cat"!
  [0.03, 0.08, 0.08, 0.04, 0.04, 0.06,  0.10,  0.20, 0.28, 0.09], // was
  [0.02, 0.10, 0.06, 0.03, 0.03, 0.06,  0.08,  0.18, 0.14, 0.30], // sleepy
];

function heat(w: number): string {
  /* Maps [0,1] -> cool blue (low) to bright amber (high), visible on dark bg.
     Normalized to ~0.45 typical max so the hottest cell reads as full amber. */
  const t = Math.min(w / 0.45, 1);
  const r = Math.round(t * 255);
  const g = Math.round(t * 175);
  const b = Math.round((1 - t) * 160 + 15);
  const alpha = 0.18 + t * 0.72;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function AttentionViz() {
  const [hoverRow, setHoverRow] = useState<number | null>(null);

  const activeRow = hoverRow ?? 7; // default to "it" — shows the cat reference
  const maxCol = WEIGHTS[activeRow].indexOf(Math.max(...WEIGHTS[activeRow]));

  return (
    <div className="viz-card">
      <div className="viz-title">Self-Attention Heatmap</div>
      <div className="viz-subtitle">
        hover a word (row) to see what it attends to. &ldquo;it&rdquo; lights up &ldquo;cat&rdquo; — the model figured out the reference.
      </div>

      <div className="attn-wrap">
        {/* Column headers */}
        <div className="attn-grid" style={{ gridTemplateColumns: `60px repeat(${WORDS.length}, 1fr)` }}>
          <div className="attn-corner" />
          {WORDS.map((w, j) => (
            <div
              key={j}
              className={`attn-col-label${j === maxCol ? ' highlight' : ''}`}
            >
              {w}
            </div>
          ))}

          {/* Rows */}
          {WORDS.map((word, i) => (
            <>
              <div
                key={`label-${i}`}
                className={`attn-row-label${activeRow === i ? ' highlight' : ''}`}
                onMouseEnter={() => setHoverRow(i)}
                onMouseLeave={() => setHoverRow(null)}
              >
                {word}
              </div>
              {WEIGHTS[i].map((w, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`attn-cell${activeRow === i ? ' active-row' : ''}`}
                  style={{
                    background: activeRow === i ? heat(w) : heat(w * 0.22),
                    opacity: activeRow === i ? 1 : 0.6,
                  }}
                  onMouseEnter={() => setHoverRow(i)}
                  onMouseLeave={() => setHoverRow(null)}
                  title={`${word} → ${WORDS[j]}: ${(w * 100).toFixed(0)}%`}
                />
              ))}
            </>
          ))}
        </div>
      </div>

      <div className="viz-note" style={{ marginTop: 16 }}>
        Sentence: <em>&ldquo;The cat sat on the mat because it was sleepy.&rdquo;</em>
        {activeRow !== null && (
          <span style={{ marginLeft: 8 }}>
            <strong style={{ color: 'var(--accent-amber)' }}>&ldquo;{WORDS[activeRow]}&rdquo;</strong>
            {' '}most strongly attends to{' '}
            <strong style={{ color: 'var(--accent-teal)' }}>
              &ldquo;{WORDS[WEIGHTS[activeRow].indexOf(Math.max(...WEIGHTS[activeRow]))]}&rdquo;
            </strong>
          </span>
        )}
      </div>
    </div>
  );
}
