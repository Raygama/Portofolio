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
      'The 2017 paper behind every model you use now. A plain-English walk through each piece, from tokenization and embeddings up to multi-head attention, and why it beat the recurrent models it replaced.',
    coverImage: '/assets/blogs/transformer-architecture.png',
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
