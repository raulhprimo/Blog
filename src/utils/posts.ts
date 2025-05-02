import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

interface PostMetadata {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
}

export const getPostBySlug = (slug: string): Post | null => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      id: getPostIdFromSlug(slug),
      content,
      ...(data as PostMetadata),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
};

export const getAllPosts = (): Post[] => {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    return allPosts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};

export const getPostById = (id: number): Post | null => {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.id === id) || null;
};

const getPostIdFromSlug = (slug: string): number => {
  // Mapeamento de slugs para IDs
  const slugToId: Record<string, number> = {
    '2025-03-05-gadgets-inovadores': 1,
    '2025-03-05-apps-produtividade': 2,
    '2025-03-17-ia-mercado': 3,
    '2025-03-19-blockchain': 4,
    '2025-03-23-computacao-quantica': 5,
    '2025-03-27-realidade-virtual': 6,
    '2025-02-02-carros-autonomos': 7,
    '2025-02-07-6g': 8,
  };

  return slugToId[slug] || 0;
}; 