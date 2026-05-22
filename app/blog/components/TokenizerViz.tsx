'use client';

import { useState } from 'react';

const EXAMPLES = [
  {
    label: 'Attention is all you need',
    tokens: [
      { text: 'Attention', id: 14196 },
      { text: ' is', id: 318 },
      { text: ' all', id: 477 },
      { text: ' you', id: 345 },
      { text: ' need', id: 761 },
    ],
  },
  {
    label: 'transformers',
    tokens: [
      { text: 'transform', id: 3121 },
      { text: 'ers', id: 364 },
    ],
  },
  {
    label: 'unhappiness',
    tokens: [
      { text: 'un', id: 403 },
      { text: 'happ', id: 8120 },
      { text: 'iness', id: 1108 },
    ],
  },
  {
    label: 'GPT-4 is a large language model',
    tokens: [
      { text: 'GPT', id: 38 },
      { text: '-', id: 12 },
      { text: '4', id: 19 },
      { text: ' is', id: 318 },
      { text: ' a', id: 257 },
      { text: ' large', id: 1588 },
      { text: ' language', id: 3303 },
      { text: ' model', id: 2746 },
    ],
  },
];

const COLORS = ['teal', 'amber', 'purple', 'rose', 'teal', 'amber', 'purple', 'rose', 'teal', 'amber'] as const;

export default function TokenizerViz() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ex = EXAMPLES[activeIdx];

  return (
    <div className="viz-card">
      <div className="viz-title">Tokenization</div>
      <div className="viz-subtitle">
        text splits into sub-word tokens, each mapped to an integer ID in the vocabulary.
      </div>

      <div className="tok-selector">
        {EXAMPLES.map((e, i) => (
          <button
            key={i}
            className={`tok-btn${activeIdx === i ? ' active' : ''}`}
            onClick={() => setActiveIdx(i)}
            title={e.label}
          >
            &ldquo;{e.label}&rdquo;
          </button>
        ))}
      </div>

      {/* Colored inline split view — shows exactly where the model cuts */}
      <div className="tok-sentence">
        {ex.tokens.map((t, i) => (
          <span
            key={i}
            className={`tok-highlight ${COLORS[i % COLORS.length]}`}
            title={`token ID: ${t.id}`}
          >
            {t.text.replace(/^ /, ' ')}
          </span>
        ))}
      </div>

      {/* Token → ID chips */}
      <div className="tok-chips">
        {ex.tokens.map((t, i) => (
          <span key={i} className={`tok-chip ${COLORS[i % COLORS.length]}`}>
            <span className="tok-text">{t.text.replace(/^ /, ' ')}</span>
            <span className="tok-id">{t.id}</span>
          </span>
        ))}
      </div>

      <div className="viz-note">
        {ex.tokens.length} token{ex.tokens.length !== 1 ? 's' : ''}.
        Each gets its own row in the embedding matrix.
      </div>
    </div>
  );
}
