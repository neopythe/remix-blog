import { Link } from '@remix-run/react';
import { truncate } from 'lodash';

export default function PostPreview({
  content,
  createdAt,
  id,
  title,
  right,
  username,
}: {
  content: string;
  createdAt: Date;
  id: string;
  right?: boolean;
  title: string;
  username: string;
}) {
  return (
    <div
      style={{ alignItems: right ? 'flex-end' : 'flex-start' }}
      className="flex flex-col gap-4"
    >
      <Link to={`posts/${id}`} className="max-w-full">
        <h2 className="font-semibold">{title}</h2>
      </Link>
      <p
        style={{ textAlign: right ? 'right' : 'left' }}
        className="text-sm max-w-full"
      >
        {truncate(content, {
          length: 160,
          separator: /[,-]? +/,
        })}
      </p>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-[50%] bg-slate-400"></div>
        <span className="text-xs">
          <span>{new Date(createdAt).toLocaleString()}</span>
          by <span className="text-brand-blue-500">{username}</span>
        </span>
      </div>
    </div>
  );
}
