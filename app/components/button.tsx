export default function Button({
  children,
  isDisabled = false,
  onClick,
}: {
  children: React.ReactNode
  isDisabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="px-6 py-1.5 rounded text-white bg-brand-blue-600 hover:bg-brand-blue-400 transition font-semibold disabled:bg-gray-300"
    >
      {children}
    </button>
  )
}
