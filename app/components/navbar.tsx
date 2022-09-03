import { NavLink } from '@remix-run/react';
import { MdStickyNote2 } from 'react-icons/md';

import DropdownMenu from './dropdown-menu';

export default function Navbar() {
  const pages = [
    { path: '/posts', title: 'Posts' },
    { path: '/auth/login', title: 'Login' },
  ];

  const activeStyle = {
    textDecoration: 'underline wavy 2px',
    textUnderlineOffset: '0.5rem',
  };

  return (
    <nav className="bg-brand-blue-800 text-white">
      <div className="px-8 py-6 flex justify-between items-center max-w-screen-lg mx-auto">
        <NavLink
          to="/"
          className="sticky top-0 flex items-start gap-2 text-2xl font-bold"
        >
          <MdStickyNote2 />
          <span className="melody-bold">
            Remix <span className="text-brand-blue-200">Blog</span>
          </span>
        </NavLink>
        <div className="navigation">
          <div>
            <DropdownMenu pages={pages} />
          </div>
          <ul className="hidden gap-8 font-semibold">
            {pages.map((page) => (
              <li key={page.title}>
                <NavLink
                  to={page.path}
                  style={({ isActive }) => (isActive ? activeStyle : {})}
                >
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
