import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

import { Box, Container, Flex } from '@radix-ui/themes';

import NavBarAuthLinks from './NavBarAuthLinks';
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
    <nav className='bg-white flex border-b mb-5 px-5 h-14 items-center'>
      <Container>
        <Flex justify='between'>
          <Flex gap='4'>
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
          </Flex>
          <Box>
            <NavBarAuthLinks />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
