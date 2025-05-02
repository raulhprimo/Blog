import { NextResponse } from 'next/server';
import { getAllPosts } from '@/utils/posts';

// Usando a abordagem minimalista
export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch posts: ${error}` },
      { status: 500 }
    );
  }
} 