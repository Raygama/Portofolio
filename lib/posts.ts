export interface Post {
  slug: string;
  title: string;
  date: string;        // ISO 8601
  readingTime: string; // e.g. "12 min read"
  tags: string[];
  excerpt: string;
  coverImage?: string;
}

export const POSTS: Post[] = [
  {
    slug: 'how-transformers-work',
    title: 'Attention Is All You Need — How Transformers Actually Work',
    date: '2026-05-22',
    readingTime: '14 min read',
    tags: ['LLM', 'Deep Learning', 'Transformers', 'AI'],
    excerpt:
      'The 2017 paper that rewrote AI. Here\'s a plain-English walkthrough of every piece — from tokenization and embeddings all the way through multi-head attention and why it was such a big deal.',
    coverImage: '/assets/blogs/transformer-architecture.png',
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
