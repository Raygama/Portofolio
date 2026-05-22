import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import { IconArrowLeft } from '@/components/Icons';
import { getPost, POSTS } from '@/lib/posts';

/* ─── Static paths ─── */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — M. Daffa Raygama`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

/* ─── Post components lazy-loaded per slug ─── */
const POST_COMPONENTS: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'how-transformers-work': () => import('@/app/blog/posts/how-transformers-work'),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ─── Page ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const loader = POST_COMPONENTS[slug];
  if (!loader) notFound();

  const { default: PostContent } = await loader();

  return (
    <>
      <NavBar />
      <main>
        {/* Header */}
        <div className="page-header" style={{ paddingBottom: 0 }}>
          <div className="page">
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <Link href="/blog" className="back-link">
                <IconArrowLeft className="icon-sm" /> All posts
              </Link>
              <div className="terminal-prefix" style={{ marginBottom: 20 }}>
                <span className="pdot" />
                <span>~/blog/{slug}</span>
              </div>
              <div className="blog-post-tags" style={{ marginBottom: 16 }}>
                {post.tags.map((t) => (
                  <span key={t} className="tag-pill amber" style={{ marginRight: 6 }}>
                    {t}
                  </span>
                ))}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  margin: '0 0 20px',
                }}
              >
                {post.title}
              </h1>
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: 48,
                  flexWrap: 'wrap',
                }}
              >
                <span>{formatDate(post.date)}</span>
                <span style={{ color: 'var(--border-visible)' }}>·</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="page" style={{ marginBottom: 0 }}>
            <div
              style={{
                width: '100%',
                maxWidth: 860,
                margin: '0 auto',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border-visible)',
                background: 'var(--bg-secondary)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <section className="section" style={{ paddingTop: 60 }}>
          <div className="page">
            <article className="blog-post-body">
              <PostContent />
            </article>
          </div>
        </section>

        {/* Footer nav */}
        <div className="page" style={{ paddingBottom: 80 }}>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 32,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <Link href="/blog" className="back-link">
              <IconArrowLeft className="icon-sm" /> All posts
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
              }}
            >
              © 2026 · M. Daffa Raygama
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
