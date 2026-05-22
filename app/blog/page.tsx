import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { IconArrowLeft, IconArrowUpRight } from '@/components/Icons';
import { POSTS } from '@/lib/posts';

export const metadata = {
  title: 'Blog — M. Daffa Raygama',
  description: 'Writing on AI engineering, LLM systems, and real-time AI infrastructure.',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
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
              <span>~/blog</span>
            </div>
            <h1>Writing</h1>
            <p className="subtitle">
              Notes on AI engineering, LLM systems, real-time infrastructure, and open-source.
              Published when something is worth sharing.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="page">
            <div className="blog-list">
              {POSTS.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card-link"
                >
                  <article className={`blog-feat-card${i === 0 ? ' featured' : ''}`}>
                    <div className="bfc-top">
                      <div className="bfc-tags">
                        {post.tags.map((t) => (
                          <span key={t} className="tag-pill amber">{t}</span>
                        ))}
                      </div>
                      <div className="bfc-meta">
                        <span className="bfc-date">{formatDate(post.date)}</span>
                        <span className="bfc-sep">·</span>
                        <span className="bfc-time">{post.readingTime}</span>
                      </div>
                    </div>

                    <h2 className="bfc-title">{post.title}</h2>
                    <p className="bfc-excerpt">{post.excerpt}</p>

                    <div className="bfc-footer">
                      <span>Read article</span>
                      <IconArrowUpRight className="icon-sm" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
