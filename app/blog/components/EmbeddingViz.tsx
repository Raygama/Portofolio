'use client';

import { useState } from 'react';

const WORDS = [
  { label: 'king',   x: 20, y: 18, group: 'royalty' },
  { label: 'queen',  x: 30, y: 20, group: 'royalty' },
  { label: 'prince', x: 22, y: 32, group: 'royalty' },
  { label: 'dog',    x: 68, y: 22, group: 'animal' },
  { label: 'cat',    x: 76, y: 18, group: 'animal' },
  { label: 'wolf',   x: 72, y: 34, group: 'animal' },
  { label: 'bread',  x: 22, y: 72, group: 'food' },
  { label: 'rice',   x: 30, y: 78, group: 'food' },
  { label: 'pasta',  x: 18, y: 82, group: 'food' },
  { label: 'GPU',    x: 72, y: 70, group: 'tech' },
  { label: 'RAM',    x: 80, y: 76, group: 'tech' },
  { label: 'CPU',    x: 68, y: 80, group: 'tech' },
  { label: 'man',    x: 42, y: 40, group: 'gender' },
  { label: 'woman',  x: 54, y: 40, group: 'gender' },
];

const CLUSTERS = [
  { group: 'royalty', cx: 24,  cy: 24, rx: 13, ry: 11 },
  { group: 'animal',  cx: 72,  cy: 25, rx: 12, ry: 11 },
  { group: 'food',    cx: 23,  cy: 77, rx: 11, ry: 10 },
  { group: 'tech',    cx: 73,  cy: 75, rx: 11, ry: 9  },
];

const GROUP_COLORS: Record<string, string> = {
  royalty: 'var(--accent-amber)',
  animal:  'var(--accent-teal)',
  food:    'var(--accent-rose)',
  tech:    'var(--accent-purple)',
  gender:  '#8A8899',
};

export default function EmbeddingViz() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="viz-card">
      <div className="viz-title">Embedding Space (2D projection)</div>
      <div className="viz-subtitle">
        after training, semantically related words cluster together. hover to explore.
      </div>

      <div className="emb-wrap">
        <svg
          viewBox="0 0 100 100"
          className="emb-svg"
          style={{ width: '100%', height: 'auto', maxHeight: 380 }}
        >
          <defs>
            <marker id="emb-arrow" markerWidth="3.5" markerHeight="3.5" refX="3" refY="1.75" orient="auto">
              <path d="M0,0 L3.5,1.75 L0,3.5 Z" fill="var(--accent-amber)" fillOpacity="0.55" />
            </marker>
          </defs>

          {/* Cluster halos */}
          {CLUSTERS.map((c) => (
            <ellipse
              key={c.group}
              cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
              fill={GROUP_COLORS[c.group]}
              fillOpacity={0.07}
              stroke={GROUP_COLORS[c.group]}
              strokeOpacity={0.2}
              strokeWidth={0.35}
              strokeDasharray="2,1.5"
            />
          ))}

          {/* Analogy arrows: man→king and woman→queen show parallel gender offset */}
          <line x1={41} y1={39} x2={22} y2={20}
            stroke="var(--accent-amber)" strokeWidth={0.5} strokeOpacity={0.4}
            strokeDasharray="1.5,1" markerEnd="url(#emb-arrow)" />
          <line x1={53} y1={39} x2={32} y2={21}
            stroke="var(--accent-amber)" strokeWidth={0.5} strokeOpacity={0.4}
            strokeDasharray="1.5,1" markerEnd="url(#emb-arrow)" />

          {WORDS.map((w) => {
            const isHovered = hovered === w.label;
            const color = GROUP_COLORS[w.group];
            return (
              <g
                key={w.label}
                onMouseEnter={() => setHovered(w.label)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Invisible larger hit area */}
                <circle cx={w.x} cy={w.y} r={5} fill="transparent" />
                {isHovered && (
                  <circle cx={w.x} cy={w.y} r={4} fill={color} fillOpacity={0.18} />
                )}
                <circle
                  cx={w.x} cy={w.y}
                  r={isHovered ? 2.4 : 1.7}
                  fill={color}
                  opacity={isHovered ? 1 : 0.8}
                  style={{ transition: 'r 0.12s, opacity 0.12s' }}
                />
                <text
                  x={w.x + 3} y={w.y + 1}
                  fontSize={isHovered ? 3.8 : 3}
                  fontWeight={isHovered ? '600' : '400'}
                  fill={color}
                  opacity={isHovered ? 1 : 0.85}
                  fontFamily="var(--font-mono)"
                  style={{ transition: 'font-size 0.12s, opacity 0.12s', pointerEvents: 'none' }}
                >
                  {w.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="emb-legend">
          {Object.entries(GROUP_COLORS).map(([group, color]) => (
            <span key={group} className="emb-legend-item">
              <span className="emb-dot" style={{ background: color }} />
              {group}
            </span>
          ))}
        </div>
      </div>

      <div className="viz-note">
        king&nbsp;&minus;&nbsp;man&nbsp;+&nbsp;woman&nbsp;&#x2248;&nbsp;queen.
        the arrows show the gender offset is consistent — that direction means the same thing across the space.
      </div>
    </div>
  );
}
