import { NextResponse } from 'next/server';
import { getPostById } from '@/utils/posts';

type PageParams = {
  params: Promise<{ id: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function GET(_request: Request, { params }: PageParams) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);
    const post = await getPostById(numericId);

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