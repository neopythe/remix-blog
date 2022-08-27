import { useTheme } from '@chakra-ui/react'

export default function PostPreview({ right }: { right?: boolean }) {
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  return (
    <div
      style={right ? { alignItems: 'flex-end' } : {}}
      className="flex flex-col gap-4"
    >
      <h2 className="font-semibold">title</h2>
      <p style={right ? { textAlign: 'right' } : {}} className="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam error,
        quibusdam doloremque amet temporibus accusantium perspiciatis aut
        laborum dicta, ratione, culpa quo maiores sunt ab illo modi at.
        Voluptate, odio?
      </p>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-[50%] bg-slate-400"></div>
        <span className="text-xs">
          Posted 2 days ago by{' '}
          <span style={{ color: blue[500] }}>billiken</span>
        </span>
      </div>
    </div>
  )
}
