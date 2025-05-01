import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const post = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        // Procura por qualquer arquivo que contenha o ID no nome
        const fileContent = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
        const { data, content } = matter(fileContent);
        const fileId = fileName.includes('gadgets-inovadores') ? '1' : 
                      fileName.includes('apps-produtividade') ? '2' : null;
        
        if (fileId === params.id) {
          return {
            id: parseInt(fileId),
            content,
            ...data,
          } as Post;
        }
        return null;
      })
      .find(post => post !== null);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch post: ${error}` },
      { status: 500 }
    );
  }
} 