import { Link } from '@remix-run/react'
import { useTheme } from '@chakra-ui/react'

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
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  return (
    <div
      style={right ? { alignItems: 'flex-end' } : {}}
      className="flex flex-col gap-4"
    >
      <Link to={`posts/${id}`}>
        <h2 className="font-semibold">{title}</h2>
      </Link>
      <p style={right ? { textAlign: 'right' } : {}} className="text-sm">
        {content}
      </p>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-[50%] bg-slate-400"></div>
        <span className="text-xs">
          Posted <span>{new Date(createdAt).toLocaleString()}</span> by{' '}
          <span style={{ color: blue[500] }}>anonymous</span>
        </span>
      </div>
    </div>
  )
}
