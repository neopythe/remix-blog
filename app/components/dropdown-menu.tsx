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
  isUser,
  pages,
}: {
  isUser: boolean;
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
        {isUser ? (
          <form action="/logout" method="POST">
            <button className="w-full" type="submit">
              <MenuItem
                backgroundColor={blue[500]}
                color="#fff"
                _active={{ backgroundColor: blue[900], color: '#fff' }}
                _hover={{ backgroundColor: blue[900], color: '#fff' }}
              >
                Logout
              </MenuItem>
            </button>
          </form>
        ) : (
          <>
            <NavLink to="/login">
              <MenuItem>Login</MenuItem>
            </NavLink>
            <NavLink to="/register">
              <MenuItem
                backgroundColor={blue[500]}
                color="#fff"
                _active={{ backgroundColor: blue[900], color: '#fff' }}
                _hover={{ backgroundColor: blue[900], color: '#fff' }}
              >
                Register
              </MenuItem>
            </NavLink>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
