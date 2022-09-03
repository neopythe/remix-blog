import { NavLink } from '@remix-run/react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useTheme,
} from '@chakra-ui/react';
import { CgMenuGridR } from 'react-icons/cg';

export default function DropdownMenu({
  pages,
}: {
  pages: { path: string; title: string }[];
}) {
  const theme = useTheme();
  const {
    colours: { blue },
  } = theme;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<CgMenuGridR />}
        variant="outline"
        _active={{ backgroundColor: '#fff', color: blue[500] }}
        _hover={{ backgroundColor: '#fff', color: blue[500] }}
      />
      <MenuList color={blue[500]}>
        {pages.map((page) => (
          <NavLink key={page.title} to={page.path}>
            <MenuItem>{page.title}</MenuItem>
          </NavLink>
        ))}
      </MenuList>
    </Menu>
  );
}
