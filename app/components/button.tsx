export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-1.5 rounded text-white bg-brand-blue-600 hover:bg-brand-blue-400 transition font-semibold"
    >
      {children}
    </button>
  )
}
