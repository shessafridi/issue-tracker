import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

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
            <Link
              className='text-zinc-500 hover:text-zinc-800 transition-colors'
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
