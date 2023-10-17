import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

import NavLink from './NavLink';

type Props = {};

const links = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Issues',
    href: '/issues',
  },
];

const NavBar = (props: Props) => {
  return (
    <nav className='bg-white flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link className='text-2xl text-zinc-800' href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map(link => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
