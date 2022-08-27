import { NavLink } from '@remix-run/react'
import { useTheme } from '@chakra-ui/react'
import { MdStickyNote2 } from 'react-icons/md'

export default function Navbar() {
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  return (
    <nav style={{ backgroundColor: blue[800], color: '#fff' }}>
      <div className="px-8 pt-5 pb-3 flex justify-between items-start max-w-screen-lg mx-auto">
        <NavLink
          to="/"
          className="sticky top-0 flex items-start gap-2 text-2xl font-bold"
        >
          <MdStickyNote2 />
          <span className="melody-bold">
            Remix <span style={{ color: blue[200] }}>Blog</span>
          </span>
        </NavLink>
        <ul className="font-semibold">
          <li>
            <NavLink to="/posts">posts</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
