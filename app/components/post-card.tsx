import { Link } from '@remix-run/react';

interface Post {
  content: string;
  createdAt: Date;
  id: string;
  title: string;
  userId: string;
  user: { username: string };
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div className="flex flex-col border rounded border-gray-200 p-4">
        <span className="font-semibold">{post.title}</span>
        <span className="flex gap-1">
          <span>{new Date(post.createdAt).toLocaleString()}</span>
          <span>
            by <span className="text-brand-blue-500">{post.user.username}</span>
          </span>
        </span>
      </div>
    </Link>
  );
}
