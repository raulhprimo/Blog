import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function GET() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const id = fileName.includes('gadgets-inovadores') ? 1 : 
                  fileName.includes('apps-produtividade') ? 2 : null;

        if (id) {
          return {
            id,
            content,
            ...data,
          } as Post;
        }
        return null;
      })
      .filter(post => post !== null);

    const sortedPosts = allPostsData.sort((a, b) => 
      a.date < b.date ? 1 : -1
    );

    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch posts: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET_POST(id: number) {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const post = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const postId = parseInt(fileName.replace(/\.mdx$/, '').split('-')[3] || '1');
        if (postId === id) {
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          return {
            id: postId,
            content,
            ...data,
          } as Post;
        }
        return null;
      })
      .find(post => post !== null);

    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
} 