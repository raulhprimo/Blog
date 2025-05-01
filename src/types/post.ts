export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  date: string;
  author: string;
  readTime?: string;
  category?: string;
  tags?: string[];
} 