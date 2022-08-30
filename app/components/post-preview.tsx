import { Link } from '@remix-run/react'

export default function PostPreview({
  content,
  createdAt,
  id,
  title,
  right,
}: {
  content: string
  createdAt: Date
  id: string
  right?: boolean
  title: string
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
        {content}
      </p>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-[50%] bg-slate-400"></div>
        <span className="text-xs">
          <span>{new Date(createdAt).toLocaleString()}</span> by{' '}
          <span className="text-brand-blue-500">anonymous</span>
        </span>
      </div>
    </div>
  )
}
