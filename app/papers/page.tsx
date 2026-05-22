import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { IconArrowLeft, IconArrowUpRight } from '@/components/Icons';

export const metadata = {
  title: 'Papers — M. Daffa Raygama',
  description: 'Research papers and academic publications by M. Daffa Raygama.',
};

const papers = [
  {
    title: 'Prescriptive and Contextual Technical Debt Management with LLM and SonarQube',
    venue: 'Submitted to IEEE',
    year: '2026',
    status: 'Ongoing Publishing',
    tags: ['LLM', 'Technical Debt', 'SonarQube', 'Software Maintenance', 'CI/CD'],
    href: undefined,
    abstract:
      'Technical Debt (TD) is a short-term technical decision that compromises long-term software quality and stability. Static analysis tools can identify TD but only provide diagnostic analysis without prescriptive recommendations or project-specific context. This research develops an LLM-based TD management system integrated with SonarQube and GitHub to provide prescriptive and contextual analysis at the pull request level. The system leverages GPT-4 to analyze SonarQube issues within the context of pull requests, highlighting severity, short and long-term effects, and suggested remediation actions. Evaluation using a Rule2Text LLM-as-a-judge framework on 108 TD issues from two Apache projects achieved 96% good/very good scores for prescriptive analysis and 64% for contextual analysis.',
    degree: 'Sarjana Informatika (S.Kom.)',
    institution: 'Telkom University, Bandung, Indonesia',
    program: 'Informatics, Faculty of Informatics',
    supervisors: 'Dr. Eng. Jati Hiliamsyah Husen · Villy Satria Praditha S.Kom., M.Kom.',
    coauthors: 'Jati H. Husen, Villy S. Praditha, Yijun Lu, Adam R. Faqih',
  },
];

export default function PapersPage() {
  return (
    <>
      <NavBar />
      <main>
        <div className="page-header">
          <div className="page">
            <Link href="/" className="back-link">
              <IconArrowLeft className="icon-sm" /> Back to portfolio
            </Link>
            <div className="terminal-prefix" style={{ marginBottom: 20 }}>
              <span className="pdot" />
              <span>~/papers</span>
            </div>
            <h1>Papers</h1>
            <p className="subtitle">
              Academic publications and research. Currently focused on LLM applications
              in software engineering and affective computing.
            </p>
          </div>
        </div>
        <section className="section">
          <div className="page">
            <div className="other-list">
              {papers.map((p) => {
                const Tag = p.href ? 'a' : 'div';
                const linkProps = p.href
                  ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <Tag
                    key={p.title}
                    {...(linkProps as Record<string, string>)}
                    className="other-row"
                    style={{ gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 24 }}
                  >
                    <div>
                      <h4>{p.title}</h4>
                      <div className="tags-line" style={{ marginBottom: 10 }}>
                        <span style={{ color: 'var(--accent-amber)' }}>{p.venue}</span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          lineHeight: 1.65,
                          color: 'var(--text-secondary)',
                          margin: '0 0 12px',
                        }}
                      >
                        {p.abstract}
                      </p>
                      {'institution' in p && (
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            margin: '0 0 12px',
                          }}
                        >
                          <div>{p.degree} · {p.institution}</div>
                          <div>Supervisors: {p.supervisors}</div>
                          <div>Co-authors: {p.coauthors}</div>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {p.tags.map((t) => (
                          <span key={t} className="tag-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, paddingTop: 4 }}>
                      <span className="year">{p.year}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--accent-amber)',
                          padding: '3px 9px',
                          borderRadius: 999,
                          border: '1px solid rgba(251,191,36,0.3)',
                        }}
                      >
                        {p.status}
                      </span>
                      {p.href && <IconArrowUpRight className="icon row-arrow" />}
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
