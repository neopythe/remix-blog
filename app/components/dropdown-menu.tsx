import { NavLink } from '@remix-run/react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useTheme,
} from '@chakra-ui/react'
import { CgMenuGridR } from 'react-icons/cg'

export default function DropdownMenu({ pages }: { pages: string[] }) {
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<CgMenuGridR />}
        variant="outline"
      />
      <MenuList color={blue[500]}>
        {pages.map((page) => (
          <NavLink key={page} to={`/${page.toLowerCase()}`}>
            <MenuItem>{page}</MenuItem>
          </NavLink>
        ))}
      </MenuList>
    </Menu>
  )
}
